'use strict';
// Real clicks and synthetic answers only. Browser checks are not a user pilot.
const {chromium} = require('playwright');
const {spawn} = require('node:child_process');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const server = spawn('python3',['-m','http.server','8765','--bind','127.0.0.1'],{stdio:'ignore'});
const records = [];
let browser, stage = 'startup';
const pause = ms => new Promise(resolve => setTimeout(resolve,ms));
const tinyPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9Z4ZkAAAAASUVORK5CYII=','base64');
function pdfPageCount(buffer){return (buffer.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length;}
async function ready(){for(let i=0;i<40;i++){try{if((await fetch('http://127.0.0.1:8765')).ok)return;}catch{}await pause(100);}throw Error('Local server unavailable');}
(async()=>{
  fs.mkdirSync('reports/browser',{recursive:true});
  await ready(); browser = await chromium.launch({headless:true});
  for(const width of [1280,390]){
    const context = await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page = await context.newPage(); page.setDefaultTimeout(10000);
    const errors=[]; page.on('pageerror',e=>errors.push(e.message));
    const mark = text => {stage=`${width}px: ${text}`;console.log('BROWSER_STAGE '+stage);};
    try {
      mark('initial load');
      await page.goto('http://127.0.0.1:8765',{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>window.CARAMELO_DAY7 && window.CARAMELO_DAY6 && window.CARAMELO_JOURNEY);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+2),'Landing overflows horizontally');
      await page.screenshot({path:`reports/browser/landing-${width}.png`,fullPage:true});
      if(width===1280){
        mark('keyboard, focus, semantics and palette contrast');
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(()=>document.activeElement?.classList.contains('skip-link')),true,'First Tab should reach skip link');
        await page.keyboard.press('Enter');
        assert.equal(await page.evaluate(()=>document.activeElement?.id),'main','Skip link should focus main');
        const a11y=await page.evaluate(()=>{
          const ids=[...document.querySelectorAll('[id]')].map(n=>n.id);
          const duplicateIds=ids.filter((id,i)=>ids.indexOf(id)!==i);
          const brokenLabels=[...document.querySelectorAll('[aria-labelledby]')].filter(n=>!document.getElementById(n.getAttribute('aria-labelledby'))).map(n=>n.id||n.tagName);
          const unnamedButtons=[...document.querySelectorAll('button')].filter(b=>!(b.innerText||b.getAttribute('aria-label')||'').trim()).length;
          const css=getComputedStyle(document.documentElement);
          const hex=s=>css.getPropertyValue(s).trim();
          const rgb=h=>{h=h.replace('#','');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255)};
          const lum=h=>{const x=rgb(h).map(v=>v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4));return .2126*x[0]+.7152*x[1]+.0722*x[2]};
          const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
          return {duplicateIds,brokenLabels,unnamedButtons,contrast:{ink:ratio(hex('--ink-strong'),hex('--paper')),muted:ratio(hex('--muted'),hex('--paper')),primary:ratio(hex('--green'),'#ffffff')}};
        });
        assert.deepEqual(a11y.duplicateIds,[],'Duplicate ids hurt assistive technology');
        assert.deepEqual(a11y.brokenLabels,[],'aria-labelledby must point to an existing element');
        assert.equal(a11y.unnamedButtons,0,'All buttons need an accessible name');
        assert.ok(a11y.contrast.ink>=4.5 && a11y.contrast.muted>=4.5 && a11y.contrast.primary>=4.5,'Core palette must meet 4.5:1 text contrast');
        records.push({width,check:'keyboard skip link, focus target, semantics and key color contrast',status:'passed',contrast:a11y.contrast});
      }
      await page.locator('#landing [data-go="onboarding"]').click();
      await page.locator('#startQuizBtn').click();
      const questions=await page.evaluate(()=>window.CARAMELO_DATA.questions.map(q=>({type:q.type,count:(q.items||q.options).length})));
      await page.locator('#nextQuestionBtn').click();
      assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('caramelo:v4:state')).questionIndex),0);
      mark('day 1: 50 items and reload');
      for(let i=0;i<questions.length;i++){
        const q=questions[i];
        if(q.type==='ranking') for(let j=0;j<q.count;j++) await page.locator(`[data-rank-index="${j}"]`).click();
        else await page.locator('[data-option-index="0"]').click();
        await page.locator('#nextQuestionBtn').click();
        if(i===9){await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.CARAMELO_DAY7);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('caramelo:v4:state')).questionIndex),10);}
      }
      await page.locator('#results.active').waitFor();
      const expected=await page.evaluate(()=>window.CARAMELO_VOCATIONAL.result().primary.title);
      assert.equal(await page.locator('#profileName').textContent(),expected);
      await page.locator('#results [data-go="journey"]').click();
      assert.equal(await page.evaluate(()=>window.CARAMELO_JOURNEY.state.xp),100);
      await page.evaluate(()=>{window.CARAMELO_JOURNEY.completeDay(1);window.CARAMELO_JOURNEY.completeDay(1);});
      assert.equal(await page.evaluate(()=>window.CARAMELO_JOURNEY.state.xp),100);
      records.push({width,check:'50 items, core parity, reload, XP idempotency',status:'passed'});
      for(const [day,prefix,count] of [[2,'emotion',21],[3,'wheel',7],[4,'reasoning',8],[5,'reading',null]]){
        mark(`day ${day}`);
        await page.locator(`[data-journey-day="${day}"]`).click();
        const n=count||await page.evaluate(()=>window.CARAMELO_DAY5.questions.length);
        for(let i=0;i<n;i++){
          await page.locator(`.view.active [data-${prefix}-value="0"]`).click();
          await page.locator(`#${prefix}Next`).click();
        }
        await page.locator(`#${prefix}ToJourney`).click();
        records.push({width,check:`day ${day}`,status:'passed'});
      }
      mark('day 6: 14 situations');
      await page.locator('[data-journey-day="6"]').click();
      if(width===1280){
        mark('day 6: optional photo');
        await page.locator('#readinessPhotoInput').setInputFiles({name:'avatar.png',mimeType:'image/png',buffer:tinyPng});
        await page.locator('#readinessPhotoPreview img').waitFor();
        assert.match(await page.evaluate(()=>window.CARAMELO_JOURNEY.state.profilePhoto||''),/^data:image\/jpeg;base64,/);
        await page.locator('#readinessPhotoRemove').click();
        assert.equal(await page.evaluate(()=>window.CARAMELO_JOURNEY.state.profilePhoto),null);
        records.push({width,check:'optional photo upload, local resize and remove',status:'passed'});
      }
      await page.locator('#readinessStartBtn').click();
      const count=await page.evaluate(()=>window.CARAMELO_DAY6.questions.length);
      for(let i=0;i<count;i++){
        await page.locator('.view.active [data-readiness-value="0"]').click();
        await page.locator('#readinessNext').click();
      }
      await page.locator('#readinessToJourney').click();
      assert.equal(await page.evaluate(()=>window.CARAMELO_JOURNEY.state.xp),520);
      records.push({width,check:'day 6, 520 XP before final',status:'passed'});
      mark('day 7: final map and repeated access');
      await page.locator('[data-journey-day="7"]').click();
      await page.locator('#final-map.active').waitFor();
      assert.equal(await page.locator('#finalProfile').textContent(),expected);
      assert.equal(await page.locator('#finalXp').textContent(),'720 XP');
      assert.equal(await page.locator('#finalCareers .career-hypothesis').count(),3);
      assert.equal(await page.locator('#finalTimeline article').count(),3);
      await page.screenshot({path:`reports/browser/final-${width}.png`,fullPage:true});
      if(width===1280){
        mark('clipboard and real PDF');
        await context.grantPermissions(['clipboard-read','clipboard-write'],{origin:'http://127.0.0.1:8765'});
        await page.locator('#finalCopyBtn').click();
        const copied=await page.evaluate(()=>navigator.clipboard.readText());
        assert.match(copied,/TEU MAPA DO CORRE — CARAMELO/);
        assert.ok(copied.includes(expected),'Clipboard summary should include the primary profile');
        await page.emulateMedia({media:'print'});
        const pdf=await page.pdf({format:'A4',printBackground:true,margin:{top:'10mm',right:'10mm',bottom:'10mm',left:'10mm'}});
        fs.writeFileSync('reports/browser/final-map.pdf',pdf);
        assert.equal(pdf.subarray(0,4).toString(),'%PDF');
        assert.ok(pdf.length>30000,'Generated PDF should contain the final map');
        const pages=pdfPageCount(pdf);
        assert.ok(pages>=2 && pages<=8,`Unexpected PDF pagination: ${pages} pages`);
        await page.emulateMedia({media:'screen'});
        records.push({width,check:'real clipboard write and generated PDF',status:'passed',pdfPages:pages,pdfBytes:pdf.length});
      }
      await page.locator('#finalJourneyBtn').click();
      await page.locator('[data-journey-day="7"]').click();
      assert.equal(await page.evaluate(()=>window.CARAMELO_JOURNEY.state.xp),720);
      // Assert the print button invokes print; pagination needs visual review separately.
      await page.evaluate(()=>{window.__printed=0;window.print=()=>window.__printed++;});
      await page.locator('#finalPrintBtn').click();
      assert.equal(await page.evaluate(()=>window.__printed),1);
      await page.reload({waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>window.CARAMELO_DAY7);
      assert.equal(await page.evaluate(()=>window.CARAMELO_JOURNEY.state.xp),720);
      records.push({width,check:'day 7, profile parity, three hypotheses, 7/30/90 plan, 720 XP, reload and print action',status:'passed'});
      if(width===1280){
        mark('complementary and complete reset');
        await page.evaluate(()=>{window.CARAMELO_APP.go('journey');window.CARAMELO_JOURNEY.renderJourney();});
        await page.locator('#resetJourneyBtn').click();
        await pause(120);
        const partial=await page.evaluate(()=>({days:[...window.CARAMELO_JOURNEY.state.completedDays],xp:window.CARAMELO_JOURNEY.state.xp,quiz:window.CARAMELO_VOCATIONAL.quizComplete()}));
        assert.deepEqual(partial.days,[1]);
        assert.equal(partial.xp,100);
        assert.equal(partial.quiz,true);
        page.once('dialog',dialog=>dialog.accept());
        await page.locator('#resetAllBtn').click();
        await pause(120);
        assert.ok(await page.locator('#landing.active').count());
        const cleared=await page.evaluate(()=>({app:localStorage.getItem('caramelo:v4:state'),journey:localStorage.getItem('caramelo:v4:journey'),quiz:window.CARAMELO_VOCATIONAL.quizComplete(),xp:window.CARAMELO_JOURNEY.state.xp}));
        assert.equal(cleared.app,null);
        assert.equal(cleared.journey,null);
        assert.equal(cleared.quiz,false);
        assert.equal(cleared.xp,0);
        records.push({width,check:'complementary reset preserves Day 1; complete reset clears all local progress',status:'passed'});
      }
      assert.deepEqual(errors,[],'Uncaught browser errors');
      records.push({width,check:'uncaught exceptions',status:'passed'});
    }catch(error){records.push({width,stage,status:'failed',error:error.message});throw error;}
    finally{await context.close();}
  }
  const storageContext=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
  const storagePage=await storageContext.newPage(); storagePage.setDefaultTimeout(10000);
  const storageErrors=[]; storagePage.on('pageerror',e=>storageErrors.push(e.message));
  await storagePage.goto('http://127.0.0.1:8765',{waitUntil:'domcontentloaded'});
  await storagePage.waitForFunction(()=>window.CARAMELO_DAY6 && window.CARAMELO_JOURNEY);
  await storagePage.evaluate(()=>{Storage.prototype.setItem=function(){throw new DOMException('Blocked','QuotaExceededError')}});
  await storagePage.locator('#landing [data-go="onboarding"]').click();
  await storagePage.locator('#startQuizBtn').click();
  await storagePage.locator('[data-option-index="0"]').click();
  await storagePage.locator('#nextQuestionBtn').click();
  await storagePage.evaluate(()=>window.CARAMELO_JOURNEY.completeDay(1));
  await storagePage.evaluate(()=>{window.CARAMELO_JOURNEY.state.completedDays=[1,2,3,4];window.CARAMELO_DAY5.start()});
  await storagePage.locator('[data-reading-value="0"]').click();
  assert.deepEqual(storageErrors,[],'Blocked storage must not create uncaught errors');
  assert.match(await storagePage.locator('#toast').textContent(),/Não foi possível salvar/);
  records.push({width:1280,check:'blocked localStorage degrades without crashing app or Day 5',status:'passed'});
  await storageContext.close();
})().catch(error=>{console.error('BROWSER_FAILURE',stage,error);process.exitCode=1;}).finally(async()=>{
  fs.mkdirSync('reports/browser',{recursive:true});
  const result={sourceSHA:process.env.GITHUB_SHA||'local',records,scope:'Days 1-7; synthetic protocols; desktop and narrow-viewport Chromium; clipboard, optional photo, resets, blocked storage, keyboard/focus, semantic and contrast checks, real Chromium PDF generation; not physical-device or human screen-reader certification'};
  fs.writeFileSync('reports/browser/results.json',JSON.stringify(result,null,2));
  console.log('BROWSER_RESULT '+JSON.stringify(result));
  if(browser)await browser.close();server.kill();
});
