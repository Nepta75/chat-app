const path = require('path')
const db = require(`${path.dirname(__filename)}/../db.json`)

module.exports = (req, res, next) => {
  if (/conversations/.test(req.url) && req.method === 'GET') {
    const userId = req.query?.senderId
    const result = db?.conversations?.filter(
      conv => conv.senderId == userId || conv.recipientId == userId
    )

    res.status(200).json(result)
    return;
  }

  if (/users/.test(req.url)) {
    if (req.method === 'GET') {
      const { nickname, password } = req.query;
      const user =  db.users.find(user => user.nickname === nickname && user.password === password);

      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({})
      }
      return
    }

    if (req.method === 'POST') {
      const { nickname } = req.body;
      const userExist = db.users.find(user => user.nickname === nickname);
      console.log('userExist', userExist);
      if (userExist) {
        res.status(403).json({})
        return
      }
    }
  }
  next();
}