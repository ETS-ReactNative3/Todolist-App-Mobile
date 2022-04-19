const API_URL = 'http://127.0.0.1:4000'

const SIGN_IN = 'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP = 'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const GET_TASKLIST = 'query taskLists($username: String!) {taskLists(where: { owner: { username: $username } }) {id title}}'

const NEW_TASKLIST = 'mutation($title: String!, $username: String!) {createTaskLists(input: {title: $title, owner: {connect: {where: {username: $username}}}}){taskLists {id, title, owner {username}}}}'

const DELETE_TASKLIST = "mutation($id: ID!) {deleteTaskLists(where: { id: $id }){nodesDeleted relationshipsDeleted}}"

const GET_TASKS = "query tasks($id: ID!) {tasks(where: {belongsTo: {id: $id}}){ id content done }}"

const NEW_TASK = "mutation($content: String!, $id: ID!) {createTasks(input: {belongsTo: {connect: {where: {id: $id}}}, content: $content}){tasks {id content done belongsTo {id} }}}"

const UPDATE_TASK = "mutation($id: ID!, $done: Boolean!) {updateTasks(where: {id: $id} update: {done: $done}){tasks {id content done belongsTo {id}}}}"

const DELETE_TASK = "mutation($id: ID!) {deleteTasks(where: {id: $id}){nodesDeleted relationshipsDeleted}}"


export function signIn (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    }
  )
}


export function signUp (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signUp
    })
    .catch(error => {
      throw error
    }
  )
}


export function getTaskLists(username, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify({
      query: GET_TASKLIST,
      variables: {
        username: username
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.taskLists
    })
    .catch(error => {
      throw error
    }
  )
}


export function newTaskList(username, title, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: NEW_TASKLIST,
      variables: {
        username: username,
        title : title
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.taskLists
    })
    .catch(error => {
      throw error
    }
  )
}


export function deleteTaskList(username, id, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: DELETE_TASKLIST,
      variables: {
        username: username,
        id : id
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.taskLists
    })
    .catch(error => {
      throw error
    }
  )
}


export function getTasks(id, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: GET_TASKS,
      variables: {
        id : id
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.tasks
    })
    .catch(error => {
      throw error
    }
  )
}


export function createTask(content, id, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: NEW_TASK,
      variables: {
        content: content,
        id: id
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data
    })
    .catch(error => {
      throw error
    }
  )
}


export function updateTask(done, id, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: UPDATE_TASK,
      variables: {
        done: done,
        id : id
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.taskLists
    })
    .catch(error => {
      throw error
    }
  )
}


export function deleteTask(id, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: DELETE_TASK,
      variables: {
        id : id
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.taskLists
    })
    .catch(error => {
      throw error
    }
  )
}