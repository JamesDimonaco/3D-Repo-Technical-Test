
import axios from "axios";

export default async function getUsers(req, res) {  
    const users = await axios.get(`https://randomuser.me/api/?results=12&seed=${req.query.seed}&page=${req.query.page}`)
    res.status(200).json({ users: users.data.results})
  }
