const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
let usersWhoSharedSecrets = [];
let secretsOfAllUsers = [];
router.post('/', async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
// router.post('/submit-secret', (req, res) => {
//     const userEmail = req.user.email; // Get the user's email from JWT
//     const { secretMessage } = req.body;

//     if (usersWhoSharedSecrets.includes(userEmail)) {
//         return res.status(400).send("You have already shared a secret.");
//     }

//     usersWhoSharedSecrets.push(userEmail);
//     secretsOfAllUsers.push({ secretMessage });

//     res.status(200).send("Secret message updated successfully.");
// });

// routes/users.js or wherever you are defining your routes
const SecretMessage = require("../models/SecretMessage"); // Import the model

router.post('/submit-secret', async (req, res) => {
    const { secretMessage } = req.body;

	let splitByWord = secretMessage.split("$userEmail$"); 

	let e = splitByWord[1]; 
	let m = splitByWord[0]; 
	
	
    const newSecretMessage = new SecretMessage({
        userEmail:e,
        message: m
    });
    try {
		let secretAllowed = false;
		for(mail of usersWhoSharedSecrets){
			if (mail == m){
				secretAllowed = true;	
			}
		}
		if (secretAllowed) {
			throw new Error("Secret not allowed for this user.");
		}
        // Save the new secret message to the database
        await newSecretMessage.save();
		usersWhoSharedSecrets.push(m);
        res.status(200).send("Secret message saved successfully: " + e +":"+m);

    } catch (error) {
        res.status(500).send("Failed to save the secret message.");
	}
});


async function deleteAllSecrets() {
	try {
	  await SecretMessage.deleteMany({}); // This deletes all documents in the SecretMessage collection
	  console.log('All secrets have been deleted from the database.');
	} catch (error) {
	  console.error('Error deleting secrets:', error);
	}
}
router.get('/secrets', async (req, res) => {
    try {
        const secrets = await SecretMessage.find({});

        const onlyMessages = [];
		
		for (const secret of secrets) {
			console.log("$$$$");
			console.log(secret.message);
			console.log("$$$$")
			onlyMessages.push(secret.message);
		}
		res.status(200).json(onlyMessages);

    } catch (error) {
        console.error("Failed to retrieve secrets:", error);
        res.status(500).send("Failed to retrieve secrets.");
    }
});

module.exports = router;
