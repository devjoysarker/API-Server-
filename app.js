
const deves = [
    {
        id : 1,
        name : "Asraf",
        skill : "IOS Deves",
        age : 20,
        location : "Uttara"
    },
    {
        id : 2,
        name : "Joy Sarker",
        skill : "MERN Stack",
        age : 27,
        location : "Mirpur"
    },
    {
        id : 3,
        name : "Rupa roy",
        skill : "UI UX",
        age : 50,
        location : "Uttara"
    },
    {
        id : 4,
        name : "Kidza Akther",
        skill : "Laravel Developer",
        age : 50,
        location : "Mirpur"
    },
    {
        id : 5,
        name : "Ali Hossian",
        skill : "Wordpress Developer",
        age : 150,
        location : "Uttara"
    },
]

let index = deves.findIndex((data) => data.id ==  5 );

deves[index] = 
    {
        id : 5,
        name : "Ali noor hossian",
        skill : "Wordpress",
        age : 150,
        location : "Uttara"
    }



    //* Split

    // let text = "ami tumi gurtay jabo, tumi jabe, amir shat";

    // console.log(text.split(' '));

    //* join 

    let food = ['alo','lao','potol'];

    console.log(food.join(' '));