import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/users?q';

export const fetchUserData = async (username, location, minRepos, page = 1) => {
  let query = ""

  if (username) query += `${username}`
  if (location) query += `+location:${location}`
  if (minRepos) query += `+repos:>${minRepos}`

  const response = await axios.get(`${BASE_URL}=${query}&page=${page}&per_page=10`)

  return response.data
}
