export const createMail = (req, res) => {
  console.log(req.body.email)
  res.json(req.body)
}
