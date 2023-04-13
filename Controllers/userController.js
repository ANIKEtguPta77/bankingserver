const bcrypt = require('bcrypt')
const _ = require('lodash')
const axios = require('axios')
const otpGenerator = require('otp-generator');


const User = require('../Model/userModel');
const Otp = require('../Model/otpModel');
const Login = require('../Model/loginModel');


const client = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);


//for otp genertartion
module.exports.signUp = async (req, res) => {
    try {
        const payment = req.body.payment;
        const user = await User.findOne({
            number: req.body.number
        });
        if (!payment) {
            if (user) return res.status(200).json({ message: false });
        }
        const OTP = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false

        });
        const number = req.body.number;
        console.log(OTP);
        const me = await client.messages
            .create({
                body: `Otp  -${OTP}`,
                messagingServiceSid: 'MG2696cee6900054b082573a57248e838a',
                to: `+91${number}`
            })
            .then(message => console.log(message.sid))


        const otp = new Otp({
            number: number,
            otp: OTP,
        });
        const salt = await bcrypt.genSalt(10)
        otp.otp = await bcrypt.hash(otp.otp, salt);

        const result = await otp.save();
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
        res.status(200).json({ message: true });
    } catch (error) {
        console.log(error);
        res.send(500).json({ message: error })
    }

}


//for verfying otp
module.exports.verifyOtp = async (req, res) => {
    const otpHolder = await Otp.find({
        number: req.body.number
    });

    if (otpHolder.length === 0) return res.status(400).send("You use an expired otp");
    const rightotp = otpHolder[otpHolder.length - 1];

    const validUser = await bcrypt.compare(req.body.otp, rightotp.otp);

    if (rightotp.number === req.body.number && validUser) {
        const user = new User(_.pick(req.body, ["number"]));
        const token = user.generateJWT();
        const result = await user.save();
        const OTPdelete = await Otp.deleteMany({
            number: rightotp.number
        });
        return res.status(200).json({
            correct: true
        })
    }
    else {
        return res.status(200).json({ correct: false });
    }

}


//for entry in database
module.exports.entry = async (req, res) => {
    try {
        const { phonenumber, firstname, lastname, password, email } = req.body;
        const hashedpassword = await bcrypt.hash(password, 10);

        const creditanils = new Login({
            phonenumber: phonenumber,
            firstname: firstname,
            lastname: lastname,
            password: hashedpassword,
            balance: 200,
            email: email,
            transactions: [{ "user": "0", "amount": 0, "date": 0 }],
            sent: 0,
            received: 0,
            linedata: [
                {
                    x: "1",
                    y: 200,
                }, {
                    x: "2",
                    y: 200,
                },
                {
                    x: "3",
                    y: 200,
                },
                {
                    x: "4",
                    y: 200,
                },
                {
                    x: "5",
                    y: 200,
                },
                {
                    x: "6",
                    y: 200,
                },
                {
                    x: "7",
                    y: 200,
                },
                {
                    x: "8", 
                    y: 200,
                },
                {
                    x: "9",
                    y: 200,
                },
                {
                    x: "10",
                    y: 200,
                },
                {
                    x: "11",
                    y: 200,
                },
                {
                    x: "12",
                    y: 200,
                },
                {
                    x: "13",
                    y: 200,
                },
                {
                    x: "14",
                    y: 200,
                },
                {
                    x: "15",
                    y: 200,
                },
                {
                    x: "16",
                    y: 200,
                },
                {
                    x: "17",
                    y: 200,
                },
                {
                    x: "18",
                    y: 200,
                },
                {
                    x: "19",
                    y: 200,
                },
                {
                    x: "20",
                    y: 200,
                },
                {
                    x: "21",
                    y: 200,
                },
                {
                    x: "22",
                    y: 200,
                },
                {
                    x: "23",
                    y: 200,
                },
                {
                    x: "24",
                    y: 200,
                },
                {
                    x: "25",
                    y: 200,
                },
                {
                    x: "26",
                    y: 200,
                },
                {
                    x: "27",
                    y: 200,
                },
                {
                    x: "28",
                    y: 200,
                },
                {
                    x: "29",
                    y: 200,
                },
                {
                    x: "30",
                    y: 200,
                },
                {
                    x: "31",
                    y: 200,
                },
            ]
        });
        const result = await creditanils.save();
        res.status(200).json({ message: "Succesful" });


    } catch (error) {
        console.log(error);
        res.send(500).json({ message: error })
    }
};



//for login
module.exports.login = async (req, res) => {
    try {
        const { phonenumber, password } = req.body;
        const user = await Login.findOne({
            phonenumber: phonenumber
        });

        if (!user) return res.status(200).json({ message: false });
        const success = await bcrypt.compare(password, user.password);

        const data = await Login.find()
        
        var data1=[]
        for(let i=0;i<data.length;i++)
        {
        var entry={
            id:data[i]._id,
            name:`${data[i].firstname} ${data[i].lastname}`,
            email:data[i].email,
            phonenumber:data[i].phonenumber
        }
        data1=[].concat(data1,entry)
       }
   
        if (success) {

            return res.status(200).json({
                message: true, phonenumber1: user.phonenumber, firstname: user.firstname, lastname: user.lastname, balance: user.balance,
                transactions: user.transactions, sent: user.sent,
                received: user.received, email: user.email, allcontacts: data1, linedata: user.linedata
            });
        }
        return res.status(200).json({ message: 'true1' });


    } catch (error) {
        console.log(error);
        res.send(500).json({ message: error })
    }
};


//for transactions
module.exports.transactions = async (req, res) => {
    try {
        const { fromphonenumber, amount, tophonenumber } = req.body;
        const fromuser = await Login.findOne({
            phonenumber: fromphonenumber
        });
        const touser = await Login.findOne({
            phonenumber: tophonenumber
        });
        const current = new Date().toLocaleString();
        if (!touser) {
            return res.status(200).json({ correct1: false });
        }
        else {


            //updating balance
            const senbal = fromuser.balance - amount;
            const recbal = touser.balance + amount;

            var linedata1 = fromuser.linedata;
            var linedata2 = touser.linedata;

            //updating linedata
            const date = new Date();
            const day = date.getDate();
            linedata1.map((item, index) => {

                if (Number(item.x) >= day) {
                    item.y = senbal;
                }
            })
            linedata2.map((item, index) => {

                if (Number(item.x) >= day) {
                    item.y = recbal;
                }
            })



            //updating transcations
            const sendertrans = fromuser.transactions;
            let newsendertrans = [].concat(sendertrans, { "user": tophonenumber, "amount": -amount, "date": current });
            const totrans = touser.transactions;
            let newtotrans = [].concat(totrans, { "user": fromphonenumber, "amount": +amount, "date": current });
            var tsent = 0;
            for (let i = 0; i < (newsendertrans.length); i++) {

                if (newsendertrans[i].amount < 0) {
                    tsent = -(newsendertrans[i].amount) + tsent;
                }
            }
            var trec = 0;
            for (let i = 0; i < (newtotrans.length); i++) {

                if (newtotrans[i].amount > 0) {
                    trec = (newtotrans[i].amount) + trec;
                }
            }

            console.log(tsent, trec)



            const r = await Login.updateMany({ phonenumber: fromphonenumber }, { $set: { balance: senbal, transactions: newsendertrans, sent: tsent, linedata: linedata1 } });
            const s = await Login.updateMany({ phonenumber: tophonenumber }, { $set: { balance: recbal, transactions: newtotrans, received: trec, linedata: linedata2 } });
            const from = await client.messages
                .create({
                    body: `Amount of ${amount} debited from the account . Balance remaining : ${senbal}`,
                    messagingServiceSid: 'MG2696cee6900054b082573a57248e838a',
                    to: `+91${fromphonenumber}`
                })
                .then(message => console.log(message.sid));
            const to = await client.messages
                .create({
                    body: `Amount of ${amount} credited to your  account . Balance remaining : ${recbal}`,
                    messagingServiceSid: 'MG2696cee6900054b082573a57248e838a',
                    to: `+91${tophonenumber}`
                })
                .then(message => console.log(message.sid));





            return res.status(200).json({ correct1: true, balance: senbal, transactions: newsendertrans, sent: tsent, linedata: linedata1 });
        }

    } catch (error) {
        console.log(error);
        res.send(500).json({ message: error })
    }
};




