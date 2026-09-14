'use strict';
// Functional browser smoke: real clicks, synthetic answers, no personal data.
const {chromium} = require('playwright');
const {spawn} = require('node:child_process');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const server = spawn('python3',['-m','http.server','8765','--bind','127.0.0.1'],{stdio:'ignore'});
const records = [];
let browser, stage = 'startup';
const pause = ms => new Promise(resolve => setTimeout(resolve,ms));
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
      // Days 6-7 and print/foto validation remain a separate acceptance gate.
      assert.deepEqual(errors,[],'Uncaught browser errors');
      records.push({width,check:'uncaught exceptions',status:'passed'});
    }catch(error){records.push({width,stage,status:'failed',error:error.message});throw error;}
    finally{await context.close();}
  }
})().catch(error=>{console.error('BROWSER_FAILURE',stage,error);process.exitCode=1;}).finally(async()=>{
  fs.mkdirSync('reports/browser',{recursive:true});
  fs.writeFileSync('reports/browser/results.json',JSON.stringify({sourceSHA:process.env.GITHUB_SHA||'local',records,scope:'Days 1-5; synthetic protocols; desktop and mobile Chromium; not physical device or accessibility certification'},null,2));
  if(browser)await browser.close();server.kill();
});
