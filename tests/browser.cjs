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
      await page.waitForFunction(()=>window.CARAMELO_DAY7 && window.CARAMELO_DAY6 && window.CARAMELO_JOURNEY && window.CARAMELO_V92 && window.CARAMELO_V93 && window.CARAMELO_V95 && window.CARAMELO_V96 && window.CARAMELO_V97);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+2),'Landing overflows horizontally');
      await page.screenshot({path:`reports/browser/landing-${width}.png`,fullPage:true});
      assert.equal(await page.locator('#landing #v9ProfileShowcase').count(),0,'Profile library should not live on the landing');
      assert.equal(await page.locator('#landing .v9-hero-benefit').count(),4);
      await page.waitForFunction(()=>document.querySelectorAll('#landing .v91-hero-mosaic img').length===4);
      assert.equal(await page.locator('#landing .v91-hero-mosaic img').count(),4);
      assert.equal(await page.locator('#landing .v92-home-compass').count(),1,'Animated landing compass should exist');
      assert.equal(await page.locator('#landing .v92-compass-base').getAttribute('src'),'assets/journey/compass_base.svg');
      assert.equal(await page.locator('#landing .v92-compass-ring').getAttribute('src'),'assets/journey/compass_ring.svg');
      assert.equal(await page.locator('#landing .v92-compass-needle').getAttribute('src'),'assets/journey/compass_needle.svg');
      assert.equal(await page.locator('#v93Resume').count(),1,'V9.3 resume control should exist');
      assert.equal(await page.locator('#v93Resume').getAttribute('hidden'),'','Fresh journey should keep resume control hidden');
      await page.locator('[data-view-button="methodology"]').click();
      await page.locator('#methodology.active').waitFor();
      await page.waitForFunction(()=>document.querySelectorAll('#methodology #v9ProfileShowcase .v9-profile-mini').length===7);
      assert.equal(await page.locator('#methodology #v9ProfileShowcase .v9-profile-mini').count(),7);
      const communicatorSrc=await page.locator('#methodology #v9ProfileShowcase .v9-profile-mini').filter({hasText:'Comunicador Influente'}).locator('img').getAttribute('src');
      assert.match(communicatorSrc,/comunicador-influente\.svg$/);
      await page.locator('[data-view-button="landing"]').click();
      await page.locator('#landing.active').waitFor();
      if(width===390){
        const mobileHeader=await page.evaluate(()=>{
          const brand=document.querySelector('.topbar .brand')?.getBoundingClientRect();
          const nav=document.querySelector('.topbar .nav')?.getBoundingClientRect();
          return {brandBottom:brand?.bottom||0,navTop:nav?.top||0};
        });
        assert.ok(mobileHeader.brandBottom<=mobileHeader.navTop+1,`Mobile brand/nav overlap: ${JSON.stringify(mobileHeader)}`);
        records.push({width,check:'mobile topbar uses two non-overlapping rows; profile library removed from landing',status:'passed'});
      }
      if(width===1280){
        mark('keyboard, focus, semantics and palette contrast');
        await page.locator('.skip-link').focus();
        assert.equal(await page.evaluate(()=>document.activeElement?.classList.contains('skip-link')),true,'Skip link must be keyboard-focusable');
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
      assert.equal(await page.locator('#onboarding.active').count(),1);
      await page.waitForFunction(()=>document.querySelector('#onboarding.active')?.classList.contains('v92-view-enter'));
      assert.equal(await page.locator('#onboarding.v92-view-enter').count(),1,'View transition class should be applied');
      if(width===1280) await page.screenshot({path:'reports/browser/audit-onboarding-1280.png',fullPage:true});
      if(width===1280){await page.locator('[data-moment="curso-faculdade"]').focus();await page.keyboard.press('Space');assert.equal(await page.locator('[data-moment="curso-faculdade"]').getAttribute('aria-pressed'),'true');records.push({width,check:'onboarding choice is keyboard-operable',status:'passed'});}
      await page.locator('#startQuizBtn').click();
      await page.waitForFunction(()=>document.querySelector('.view.active')?.dataset.v93Day==='1');
      assert.equal(await page.locator('.view.active').getAttribute('data-v93-day'),'1');
      await page.waitForFunction(()=>document.querySelector('#journeyTopProgress.visible')&&document.querySelector('#journeyTopCurrentBadge'));
      assert.equal(await page.locator('#journeyTopSteps .journey-top-step').count(),7);
      assert.equal(await page.locator('#journeyTopSteps .journey-top-step.current').count(),1);
      assert.match(await page.locator('#journeyTopCurrentBadge').getAttribute('src'),/day1_badge\.svg$/);
      await page.waitForFunction(()=>document.querySelector('#v95QuizTools'));
      assert.equal(await page.locator('#v95PauseBtn').count(),1,'Day 1 should allow pausing and resuming later');
      assert.match(await page.locator('#v95SaveState').innerText(),/Salvo neste navegador|Salvamento indisponível/);
      assert.ok(await page.locator('#v81SoundToggle').count(),'V8.1 sound control should exist');
      assert.match(await page.locator('#v81SoundToggle').getAttribute('aria-pressed'),/true|false/);
      await page.waitForFunction(()=>document.querySelector('#v81PhaseOverlay')?.dataset.day==='1');
      await page.waitForFunction(()=>document.querySelector('#v9QuestionArt img')?.getAttribute('src')?.includes('assets/profiles/'));
      assert.equal(await page.locator('#v81PhaseOverlay').getAttribute('data-day'),'1');
      await page.waitForFunction(()=>document.querySelector('#v9QuestionArt strong')?.textContent?.includes('combina mais com você'));
      const artLabel=(await page.locator('#v9QuestionArt strong').textContent()).trim();
      const profileTitles=await page.evaluate(()=>window.CARAMELO_DATA.profiles.map(p=>p.title));
      assert.ok(!profileTitles.includes(artLabel),'Assessment illustration should not expose a profile label while answering');
      if(width===1280){
        await page.screenshot({path:'reports/browser/audit-day1-question-1280.png',fullPage:true});
        const qfit=await page.evaluate(()=>({bottom:document.querySelector('#questionHost .question-actions')?.getBoundingClientRect().bottom||9999,height:innerHeight}));
        assert.ok(qfit.bottom<=qfit.height+2,`Primary question actions should fit in viewport: ${JSON.stringify(qfit)}`);
        records.push({width,check:'day 1 primary question fits viewport without vertical scroll to actions',status:'passed'});
      }
      const questions=await page.evaluate(()=>window.CARAMELO_DATA.questions.map(q=>({type:q.type,count:(q.items||q.options).length})));
      await page.locator('#nextQuestionBtn').click();
      assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('caramelo:v4:state')).questionIndex),0);
      mark('day 1: 50 items and reload');
      for(let i=0;i<questions.length;i++){
        const q=questions[i];
        if(q.type==='ranking'){
          for(let j=0;j<q.count;j++) await page.locator(`[data-rank-index="${j}"]`).click();
          assert.match(await page.locator('.v95-ranking-count').innerText(),new RegExp(q.count+' de '+q.count));
        } else await page.locator('[data-option-index="0"]').click();
        if(i===0){
          await page.locator('#v95PauseBtn').click();
          await page.locator('#landing.active').waitFor();
          await page.waitForFunction(()=>!document.querySelector('#v93Resume')?.hidden);
          await page.locator('#v93ResumeButton').click();
          await page.locator('#quiz.active').waitFor();
          assert.equal(await page.evaluate(()=>window.CARAMELO_APP.state.questionIndex),0);
        }
        await page.locator('#nextQuestionBtn').click();
        if(await page.locator('#v95ChapterBreak.is-open').count()){
          if(i===9){
            assert.match(await page.locator('#v95ChapterBreak').innerText(),/Parte 1 de 5 concluída/i);
            assert.match(await page.locator('#v95ChapterNext').innerText(),/Como resolvo problemas/i);
            assert.equal(await page.locator('#v95ChapterBreak').getAttribute('data-from-chapter'),'0');
            await page.waitForFunction(()=>document.querySelector('#v95ChapterBreak .v96-chapter-label'));
            assert.match(await page.locator('#v95ChapterBreak .v96-chapter-label').innerText(),/Como resolvo problemas/i);
          }
          await page.locator('#v95ChapterContinue').click();
        }
        if(i===9){await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.CARAMELO_DAY7&&window.CARAMELO_V93&&window.CARAMELO_V95);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('caramelo:v4:state')).questionIndex),10);await page.evaluate(()=>window.CARAMELO_APP.go('landing'));await page.waitForFunction(()=>!document.querySelector('#v93Resume')?.hidden);assert.match((await page.locator('#v93Resume').innerText()),/Pergunta 11 de 50/);await page.locator('#v93ResumeButton').click();await page.waitForFunction(()=>document.querySelector('#quiz.active'));assert.equal(await page.evaluate(()=>window.CARAMELO_APP.state.questionIndex),10);}
      }
      await page.locator('#results.active').waitFor();
      await page.waitForFunction(()=>document.querySelector('#v8ResultDashboard')&&document.querySelector('#v9AxisSummary')&&document.querySelector('#v9ProfileDetailBtn')&&document.querySelector('#v96ResultNav'));
      assert.equal(await page.locator('#v96ResultNav button').count(),4);
      if(width===390){
        const resultOrder=await page.evaluate(()=>({
          profile:document.querySelector('#profileVisualDay1')?.getBoundingClientRect().top||0,
          rings:document.querySelector('#resultRingsDay1')?.getBoundingClientRect().top||0,
          axes:document.querySelector('#v9AxisSummary')?.getBoundingClientRect().top||0
        }));
        assert.ok(resultOrder.profile<resultOrder.rings&&resultOrder.rings<resultOrder.axes,`Mobile result order should be profile -> compass -> axes: ${JSON.stringify(resultOrder)}`);
        records.push({width,check:'mobile result prioritizes profile, then compass, then axes with quick navigation',status:'passed'});
      }
      if(width===1280){
        assert.equal(await page.locator('#v9AxisSummary .bar-row').count(),6);
        assert.ok(await page.locator('#resultRingsDay1 .v9-ring-compass').count());
        await page.screenshot({path:'reports/browser/audit-day1-result-1280.png',fullPage:true});
        const rfit=await page.evaluate(()=>({bottom:document.querySelector('#results .actions')?.getBoundingClientRect().bottom||9999,height:innerHeight,dashboard:!!document.querySelector('#v8ResultDashboard'),details:!!document.querySelector('#v8ResultDetails')}));
        assert.ok(rfit.bottom<=rfit.height+2,`Primary result actions should fit in viewport: ${JSON.stringify(rfit)}`);
        assert.ok(rfit.dashboard&&rfit.details);
        await page.locator('#v9ProfileDetailBtn').click();
        await page.locator('#v8ResultDetails[open]').waitFor();
        assert.equal(await page.locator('#v8ResultDetails [data-v9-tab]').count(),4);
        await page.locator('#v8ResultDetails [data-v9-tab="traits"]').click();
        assert.equal(await page.locator('#v8ResultDetails [data-v9-panel="traits"]').isVisible(),true);
        await page.locator('#v8ResultDetails .v8-dialog-close').click();
        records.push({width,check:'day 1 primary result dashboard and actions fit viewport; full detail available in dialog',status:'passed'});
      }
      const expected=await page.evaluate(()=>window.CARAMELO_VOCATIONAL.result().primary.title);
      assert.equal(await page.locator('#profileName').textContent(),expected);
      await page.locator('#results [data-go="journey"]').click();
      if(width===1280) await page.screenshot({path:'reports/browser/audit-journey-1280.png',fullPage:true});
      assert.equal(await page.evaluate(()=>window.CARAMELO_JOURNEY.state.xp),100);
      await page.waitForFunction(()=>document.querySelector('#v93Completion')?.dataset.day==='1');
      assert.match(await page.locator('#v93Completion').innerText(),/Dia 1 concluído/i);
      await page.evaluate(()=>{window.CARAMELO_JOURNEY.completeDay(1);window.CARAMELO_JOURNEY.completeDay(1);});
      assert.equal(await page.evaluate(()=>window.CARAMELO_JOURNEY.state.xp),100);
      records.push({width,check:'50 items, core parity, reload, XP idempotency',status:'passed'});
      for(const [day,prefix,count] of [[2,'emotion',21],[3,'wheel',7],[4,'reasoning',8],[5,'reading',null]]){
        mark(`day ${day}`);
        await page.locator(`[data-journey-day="${day}"]`).click();
        if(width===1280) await page.screenshot({path:`reports/browser/audit-day${day}-start-1280.png`,fullPage:true});
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
      if(width===1280) await page.screenshot({path:'reports/browser/audit-day6-intro-1280.png',fullPage:true});
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
        const cleared=await page.evaluate(()=>{const app=JSON.parse(localStorage.getItem('caramelo:v4:state')||'null');return {app,journey:localStorage.getItem('caramelo:v4:journey'),quiz:window.CARAMELO_VOCATIONAL.quizComplete(),xp:window.CARAMELO_JOURNEY.state.xp}});
        assert.equal(cleared.app?.view,'landing');
        assert.deepEqual(cleared.app?.answers||{},{});
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
  const compactContext=await browser.newContext({viewport:{width:1366,height:768},reducedMotion:'reduce'});
  const compactPage=await compactContext.newPage(); compactPage.setDefaultTimeout(10000);
  const compactErrors=[]; compactPage.on('pageerror',e=>compactErrors.push(e.message));
  await compactPage.goto('http://127.0.0.1:8765',{waitUntil:'domcontentloaded'});
  await compactPage.waitForFunction(()=>window.CARAMELO_DAY7 && window.CARAMELO_V81 && window.CARAMELO_V92 && window.CARAMELO_V93 && window.CARAMELO_V95 && window.CARAMELO_V96 && window.CARAMELO_V97);
  await compactPage.locator('#landing [data-go="onboarding"]').click();
  await compactPage.locator('#startQuizBtn').click();
  const compactQuestion=await compactPage.evaluate(()=>({bottom:document.querySelector('#questionHost .question-actions')?.getBoundingClientRect().bottom||9999,height:innerHeight}));
  assert.ok(compactQuestion.bottom<=compactQuestion.height+2,`1366x768 question actions must fit viewport: ${JSON.stringify(compactQuestion)}`);
  await compactPage.evaluate(()=>window.CARAMELO_APP.go('landing'));
  await compactPage.locator('#demoResultBtn').click();
  await compactPage.waitForFunction(()=>document.querySelector('#results.active')&&document.querySelector('#v8ResultDashboard'));
  const compactResult=await compactPage.evaluate(()=>({bottom:document.querySelector('#results .actions')?.getBoundingClientRect().bottom||9999,height:innerHeight}));
  assert.ok(compactResult.bottom<=compactResult.height+2,`1366x768 result actions must fit viewport: ${JSON.stringify(compactResult)}`);
  assert.deepEqual(compactErrors,[],'Compact desktop viewport must not create uncaught errors');
  records.push({width:1366,height:768,check:'V8.1 compact desktop question and result actions fit viewport; phase and sound UI present',status:'passed'});
  await compactContext.close();

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
  const result={sourceSHA:process.env.GITHUB_SHA||'local',records,scope:'Days 1-7; synthetic protocols; desktop 1280x900, compact desktop 1366x768 and narrow 390x900 Chromium; optional sound/phase UI, clipboard, optional photo, resets, blocked storage, keyboard/focus, semantic and contrast checks, real Chromium PDF generation; not physical-device or human screen-reader certification'};
  fs.writeFileSync('reports/browser/results.json',JSON.stringify(result,null,2));
  console.log('BROWSER_RESULT '+JSON.stringify(result));
  if(browser)await browser.close();server.kill();
});
