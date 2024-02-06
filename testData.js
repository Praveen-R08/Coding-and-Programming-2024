let prefixes = ['470','404','706']

names = [
   'FBLA Club Events',
   'HOSA Club Events',
   'Food4Lives NonProfit Volunteering',
   'AcuityBrands Company Jobs',
   'BlueLinx Company Job',
   'Boeing Company Job',
   'EearthLink Company Jobs',
   'Robotics Club Events',
   'LockheedMartin Company Jobs',
   'Greenwood Company Job',
   'NextStepAtlanta NonProfit Volunteering',
   'Havertys Company Jobs',
   'LexisNexis Company Job',
   'LendingPoint Company Job',
   'HackClub Club Hackathons',
   'NanoLumens Company Job',
   'MealsOnWheels NonProfit Volunteering',
   'OxfordIndustries Company Jobs',
   'Spanx Company Job',
   'MealsByGrace NonProfit Volunteering',
   'Synovus Company Job',
   'Rocketry Club Experience',
   'FeedingAmerica NonProfit Volunteering',
   'TSYS Company Job',
   'HabitatForHumanity NonProfit Volunteering',
]

function generateRandomString(length) {
   let result = '';
   const characters = '0123456789';
   const charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
 }

let counter = 0;

let DATA = ''
for (i = 0; i < names.length; i++) {

   DATA+= `
   {
      "name": "${names[i].split(' ')[0]}",
      "type": "${names[i].split(' ')[1]}",
      "resources": "${names[i].split(' ')[2]}",
      "email": "example${counter}@gmail.com",
      "mobile": "${prefixes[Math.floor(Math.random() * prefixes.length)]}${generateRandomString(7)}"
   },`

   counter++;
}

console.log(DATA)