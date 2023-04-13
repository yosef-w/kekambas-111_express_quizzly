module.exports = (req, res) => {
    console.log(req.body);
        if (req.body.password !== req.body.confirmPass){
        res.status(400).send({ error: "Your passwords do not match" })
    } else {
        try {

            const mutation = `
                mutation ($username: String!, $email: String!, $password: String!){
                    register(
                        email: $email
                        password: $password
                    )
                }
            `

            const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
                    {
                        query: mutation,
                        variables: {
                            email: req.body.email,
                            password: req.body.password
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )

            const jwtoken = data.data.login;
            res.cookie('jwtoken', jwtoken, { httpOnly: true })
            res.redirect('/');

        } catch(err){
            console.log(err)
            res.redirect('/auth/register')
        }
    }
}
