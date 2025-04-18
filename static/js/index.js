const questions = [
    "Had ignored an email from a professor or TA for more than a week?",
    "Had gone to class in pajamas?",
    "Had day-drank?",
    "Had gone 2 or more days of not showering during finals week?",
    "Had hooked up with someone you met on third street?",
    "Had walked under the Purdue bell Tower?",
    "Had yelled \"Boiler Up!\" to a stranger?",
    "Had switched labs just to get a better TA?",
    "Had used a fake id at a bar?",
    "Had crashed your bike or been hit by someone else while cycling in a bike lane?",
    "Had sent a sexually explicit text/photograph to someone at Purdue?",
    "Had contemplated transferring but stuck it out?",
    "Had woken up in a different bed after a night of drinking?",
    "Had submitted an assignment a minute before the deadline?",
    "Had met Mung Chiang in person?",
    "Had been to Harry’s Chocolate Shop?",
    "Had snuck into a building after hours?",
    "Had partied on a weekday?",
    "Had walked out of a class mid-lecture?",
    "Had lied to a professor about why you missed class?",
    "Had done a group project by yourself because no one else helped?",
    "Had sexual intercourse with someone at a frat party?",
    "Had blacked-out from drinking?",
    "Had ridden a veo/lime?",
    "Had forgotten your laundry in the dryer for over 24 hours?",
    "Had retaken calculus for the GPA because you did well during high school, only to realize what you’ve done when it was too late?",
    "Had signed up for a class just because it was easy, not interesting?",
    "Had broken up with someone at Purdue?",
    "Had ghosted a group project or club after joining?",
    "Had masturbated while your roommate was in the room?",
    "Had dated someone at Purdue?",
    "Had sexual intercourse with someone at Purdue?",
    "Had gotten food poisoning from campus dining?",
    "Had cried after an exam?",
    "Had used ChatGPT (or AI) completely to submit assignments?",
    "Had dated someone you met on third street?",
    "Had pulled an all-nighter for an exam?",
    "Had skipped class just to work on something for another class?",
    "Had turned in an assignment without reading the instructions?",
    "Had slept on the forbidden WALC couches/North hall couches? (iykyk)",
    "Had gone out for halloweekend on multiple weekends?",
    "Had a threesome?",
    "Had used a fake id to buy alcohol?",
    "Had gotten back together with someone at Purdue?",
    "Had made out with someone in public at Purdue?",
    "Had missed an exam?",
    "Had used someone else’s swipe/card to get into a building or event?",
    "Had spent the night with someone at Purdue?",
    "Had dated someone you met at a frat party?",
    "Had argued with a TA?",
    "Had done homework during a party?",
    "Had a pregnancy scare?",
    "Had sexual intercourse in public at Purdue?",
    "Had thrown up on campus from drinking?",
    "Had snuck alcohol into a dorm?",
    "Had sexual intercourse with more than 10 people at Purdue?",
    "Had made your professor visibly annoyed?",
    "Had stolen dining court silverware or dishes?",
    "Had tailgated before a football game?",
    "Had sexual intercourse with someone in a motor vehicle at Purdue?",
    "Had skipped class just because the weather was too nice?",
    "Had failed a class at Purdue?",
    "Had been caught masturbating at Purdue?",
    "Had made out with someone at a frat party?",
    "Had fallen asleep during a lecture?",
    "Had studied for the wrong exam or quiz?",
    "Had gone to class hungover?",
    "Had kissed someone at Purdue?",
    "?",
    "Had sexual intercourse with someone you didn’t know",
    "Had worked a job while at Purdue?",
    "Had been locked out of your dorm/apartment?",
    "Had been to a frat party before?",
    "Had purposefully stopped a starship robot/Had a complete conversation with a crackhead in Indy?",
    "Had sled off of Slayter hill/Walked on the frozen Canal?",
    "Had made it on a Purdue meme page? (barstoolpurdue, purduechicks, etc.)",
    "Had had a crush on a TA?",
    "Had skipped class just because the weather was too awful?",
    "Had taken a nap in (Hicks or WALC)/(IO or UL)?",
    "Had been kicked out by your roommate so they could have intimate time with someone?",
    "Had cried over an assignment?",
    "Had eaten at the Triple XXX Family Restaurant/Dick's Last Resort?",
    "Had kissed someone at a frat party?",
    "Had seen the Purdue Morph Dudes?",
    "Had kicked your roommate out so you could have intimate time with someone?",
    "Had been to a Purdue basketball game?",
    "Had masturbated at Purdue?",
    "Had been written up by an RA?",
    "Had gone out for halloweekend?",
    "Had taken a photo with the Boilermaker Statue/Indy circle city monument?",
    "Had lied to skip your lecture?",
    "Had a fire alarm ever been pulled during your exam?",
    "Had gone on a road/bus trip to IU?",
    "Had walked across campus at 3am?",
    "Had smoked weed on campus?",
    "Had made out with someone at Purdue?",
    "Had bought textbooks and never read them?",
    "Had given a professor a 1 star rating on ratemyprofessor?",
    "Had rushed a frat/sorority before?",
    "Had taken a picture with Purdue Pete?"
];



const questionList = document.getElementById("questionList");
questions.forEach((text, i) => {
    const li = document.createElement("li");
    li.className = "question";
    li.innerHTML = `
      <input type="checkbox" id="q${i+1}" name="q${i+1}">
      <label for="q${i+1}">${text}</label>
    `;
    questionList.appendChild(li);
});

function calculateScore() {
    const totalQuestions = 100;
    let yesCount = 0;
    for (let i = 1; i <= totalQuestions; i++) {
        if (document.getElementById('q' + i).checked) {
            yesCount++;
        }
    }
    let score = 100 - yesCount;
    if (score < 0) score = 0;
    let message;

    if (score === 100) {
        message = "No way you go to Purdue.";
    } else if (score >= 90) {
        message = "Pretty pure, not bad at all.";
    } else if (score >= 80) {
        message = "You’ve had some fun, haven’t you?";
    } else if (score >= 70) {
        message = "Living the classic college life.";
    } else if (score >= 60) {
        message = "A little wild but I respect it.";
    } else if (score >= 50) {
        message = "Okay let's relax a little bit here.";
    } else if (score >= 40) {
        message = "You’ve been *around* Purdue, huh?";
    } else if (score >= 30) {
        message = "Absolutely unhinged.";
    } else if (score >= 20) {
        message = "Do you even *remember* Purdue?";
    } else if (score >= 10) {
        message = "Someone call the police.";
    } else {
        message = "What in the Boilermaker hell did you DO?! 💀";
    }

    // Send the score to the backend
    fetch("/submit-score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({score: score})
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // Redirect to the score page with query parameters
            window.location.href = `/score?score=${encodeURIComponent(score)}&message=${encodeURIComponent(message)}`;
        })
        .catch(error => console.log("Error:", error));
}