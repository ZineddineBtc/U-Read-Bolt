const sentences = [
    {
        index: 0,
        text: 'Will you show me your photo album?'
        },
        {
        index: 1,
        text: 'She greets him every morning as he enters the school building.'
        },
        {
        index: 2,
        text: 'She surprised him with a small gift.'
        },
        {
        index: 3,
        text: 'I seem to have a temperature.'
        },
        {
        index: 4,
        text: 'No. This is my first time. How does it taste?'
        },
        {
        index: 5,
        text: 'Maybe he won\'t become famous.'
        },
        {
        index: 6,
        text: 'Tom never fails to send a birthday present to his father.'
        },
        {
        index: 7,
        text: 'How many people?'
        },
        {
        index: 8,
        text: 'She found him a seat.'
        },
        {
        index: 9,
        text: 'I disagree with you.'
        },
        {
        index: 10,
        text: 'How do I get to Gate 33?'
        },
        {
        index: 11,
        text: 'I believe you.'
        },
        {
        index: 12,
        text: 'She threw him out.'
        },
        {
        index: 13,
        text: 'I am thinking about my children.'
        },
        {
        index: 14,
        text: 'It\'s a cloudy day.'
        },
        {
        index: 15,
        text: 'Are you an only child?'
        },
        {
        index: 16,
        text: 'Eat whatever food you like.'
        },
        {
        index: 17,
        text: 'The audience clapped when the concert was over'
        },
        {
        index: 18,
        text: 'It was a terrible affair.'
        },
        {
        index: 19,
        text: 'I don\'t want to wait that long.'
        },
        {
        index: 20,
        text: 'That boy is smart.'
        },
        {
        index: 21,
        text: 'I can\'t figure out how to delete what I just posted.'
        },
        {
        index: 22,
        text: '4 days. I\'m going back on Friday.'
        },
        {
        index: 23,
        text: 'Many friends came to see me off.'
        },
        {
        index: 24,
        text: 'Do you feel like eating?'
        },
        {
        index: 25,
        text: 'Would you mind sending this letter for me?'
        },
        {
        index: 26,
        text: 'Are you seriously thinking about eating all that?'
        }     
];

function randomSentence(){
    const r = Math.floor(Math.random()*(sentences.length-1)); 
    return sentences[r].text;
}

module.exports = randomSentence;