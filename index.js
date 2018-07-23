'use strict';

// const {WebhookClient} = require('dialogflow-fulfillment');
// const {Card, Suggestions, Payload} = require('dialogflow-fulfillment');

const {
    dialogflow,
    BrowseCarousel,
    BrowseCarouselItem,
    LinkOutSuggestion,
    Suggestions,
    SimpleResponse
} = require('actions-on-google');

const functions = require('firebase-functions');
const rp = require('request-promise');
const ta = require('time-ago');

// const app = dialogflow();
const app = dialogflow({debug: true});

app.intent('Default Welcome Intent', conv => {
    let ssml = '<speak><p><s>';
    ssml += 'สวัสดีค่ะ <break time="0.5s"/> ฉันคือ Pocket Doctor <break time="0.5s"/>';
    ssml += 'ผู้ช่วยจัดการรับบริการสุขภาพของคุณ <break time="0.5s"/>';
    ssml += 'วันนี้ต้องการใช้บริการโรงพยาบาลไหนคะ';
    ssml += '</s></p></speak>';

    let txt = 'สวัสดีค่ะ ฉันคือ Pocket Doctor \n';
    txt += 'ผู้ช่วยจัดการรับบริการสุขภาพของคุณ \n';
    txt += 'วันนี้ต้องการใช้บริการโรงพยาบาลไหนคะ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));

    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    if (hasScreen) {
        // conv.ask(new Suggestions(['เบอร์ฉุกเฉิน', 'อาการของโรคต่างๆ', 'โภชนาการ', 'โรงพยาบาลใกล้เคียง']));
        conv.ask(new Suggestions([
            'โรงพยาบาลศิริราช',
            'โรงพยาบาลรามาธิบดี',
            'เบอร์ฉุกเฉิน'
        ]));
    }
});

app.intent('siriraj', conv => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'ไม่พบประวัติการรักษาของคุณในระบบ <break time="0.5s"/>';
    ssml += 'กรุณากรอกประวัติ <break time="0.6s"/>';
    ssml += 'ทางเราขอทราบชื่อและนามสกุลของคุณด้วยค่ะ <break time="0.6s"/>';
    ssml += '</s></p></speak>';

    let txt = 'ไม่พบประวัติการรักษาของคุณในระบบ \n';
    txt += 'กรุณากรอกประวัติ \n';
    txt += 'ทางเราขอทราบชื่อและนามสกุลของคุณด้วยค่ะ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('ask_id', (conv, {name_list}, {lastname_list}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'ขอทราบเลขบัตรประชาชนเพื่อยืนยันตัวตน';
    ssml += '</s></p></speak>';

    let txt = 'ขอทราบเลขบัตรประชาชนเพื่อยืนยันตัวตน';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('ask_province', (conv, {num_id}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'คุณอาศัยอยู่ที่จังหวัดอะไรคะ';
    ssml += '</s></p></speak>';

    let txt = 'คุณอาศัยอยู่ที่จังหวัดอะไรคะ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('ask_tel', (conv, {province_list}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'หมายเลขโทรศัพท์ของคุณคือ';
    ssml += '</s></p></speak>';

    let txt = 'หมายเลขโทรศัพท์ของคุณคือ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('ask_email', (conv, {num_tel}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'Email ของคุณคือ';
    ssml += '</s></p></speak>';

    let txt = 'Email ของคุณคือ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('ask_sex', (conv, {email}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'เพศของคุณคือ';
    ssml += '</s></p></speak>';

    let txt = 'เพศของคุณคือ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('ask_height', (conv, {sex_list}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'ส่วนสูงของคุณคือ';
    ssml += '</s></p></speak>';

    let txt = 'ส่วนสูงของคุณคือ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('ask_health', (conv, {height}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'ขอทราบประวัติเกี่ยวกับโรคประจำตัวของคุณค่ะ';
    ssml += '</s></p></speak>';

    let txt = 'ขอทราบประวัติเกี่ยวกับโรคประจำตัวของคุณค่ะ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('ask_allergy', (conv, {health}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'คุณเคยมีประวัติการแพ้ยาหรือไม่คะ';
    ssml += '</s></p></speak>';

    let txt = 'คุณเคยมีประวัติการแพ้ยาหรือไม่คะ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('ask_drug', (conv, {allergy}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'ในเวลาหนึ่งเดือนที่ผ่านมา <break time="0.5s"/> คุณเคยซื้อยารับประทานเองใช่หรือไม่คะ';
    ssml += '</s></p></speak>';

    let txt = 'ในเวลาหนึ่งเดือนที่ผ่านมา \n คุณเคยซื้อยารับประทานเองใช่หรือไม่คะ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('ask_alcohol', (conv, {drug}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'คุณดื่มแอลกอฮอลล์ไหมคะ';
    ssml += '</s></p></speak>';

    let txt = 'คุณดื่มแอลกอฮอลล์ไหมคะ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('ask_smoke', (conv, {alcohol}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'นี่เป็นข้อสุดท้ายแล้วค่ะ <break time="0.5s"/> คุณสูบบุหรี่บ่อยแค่ไหนคะ';
    ssml += '</s></p></speak>';

    let txt = 'นี่เป็นข้อสุดท้ายแล้วค่ะ \n คุณสูบบุหรี่บ่อยแค่ไหนคะ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('seeyou', (conv, {smoke}) => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'การทำรายการของคุณสำเร็จแล้ว <break time="0.5s"/>';
    ssml += 'ขอบคุณที่ใช้บริการค่ะ <break time="0.6s"/>';
    ssml += 'แล้วพบกันที่โรงพยาบาลนะคะ';
    ssml += '</s></p></speak>';

    let txt = 'การทำรายการของคุณสำเร็จแล้ว \n ขอบคุณที่ใช้บริการค่ะ \n แล้วพบกันที่โรงพยาบาลนะคะ';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('rama', conv => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'สวัสดีคุณโสภณ<break time="0.5s"/>';
    ssml += 'คุณมีนัดหมอวันนี้ เวลา 9.30 น.<break time="0.6s"/>';
    ssml += 'คุณสามารถมาตามนัดได้ใช่หรือไม่คะ?';
    ssml += '</s></p></speak>';

    let txt = 'สวัสดีคุณโสภณ \n ';
    txt += 'คุณมีนัดหมอวันนี้ เวลา 9.30 น.\n ';
    txt += 'คุณสามารถมาตามนัดได้ใช่หรือไม่คะ?';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

app.intent('emergency_number', conv => {
    var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    let ssml = '<speak><p><s>';
    ssml += 'เบอร์ฉุกเฉินคือ<break time="0.5s"/>';
    ssml += '<say-as interpret-as="characters">1669</say-as><break time="0.6s"/>';
    ssml += 'มีอะไรให้ช่วยอีกไหมคะ?';
    ssml += '</s></p></speak>';

    let txt = 'เบอร์ฉุกเฉินคือ 1669 \n มีอะไรให้ช่วยอีกไหมคะ?';

    // conv.ask(ssml);
    conv.ask(new SimpleResponse({
      speech: ssml,
      text: txt
    }));
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);