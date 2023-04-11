const { User } = require('../../models')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    console.log(req.body);
    if (req.body.password !== req.body.confirmPass){
        res.status(400).send({error: "Your passwords do not match"})
    } else {
        const { username, email, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: passwordHash })
        try{
            await user.save();
            res.send(`New User Created - ${user.username}`);
        } catch (err){
            console.log(err);
            res.send('There was an issue')
        }
    }
}