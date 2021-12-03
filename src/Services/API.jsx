export const getToken = () => {
    return localStorage.getItem('token')
}

export const LoginAPI = async ({email, password}) => {

    let response = await fetch('http://edu.project.etherial.fr/auth',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'email': email,
                'password':password,
            })
        })
    let json = await response.json()

    return json
}

export const RegisterAPI = async ({firstname,lastname,email, password, password_verif}) => {

    let response = await fetch('http://edu.project.etherial.fr/users',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'firstname':firstname,
                'lastname':lastname,
                'email': email,
                'password':password,
                'password_verif':password_verif,
            })
        })
    let json = await response.json()

    return json
}

export const EditUserAPI = async ({firstname,lastname,birthdate}) => {

    let response = await fetch('http://edu.project.etherial.fr/users/me',{
            method:'PUT',
            headers:{
                'Authorization': 'Bearer '+getToken(),
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'firstname':firstname,
                'lastname':lastname,
                'birthdate':birthdate
            })
    })
    let json = await response.json()

    return json
}

export const EditUserPasswordAPI = async ({password_old,password_new,password_new_verif}) => {

    let response = await fetch('http://edu.project.etherial.fr/users/me/password',{
            method:'PUT',
            headers:{
                'Authorization': 'Bearer '+getToken(),
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'password_old':password_old,
                'password_new':password_new,
                'password_new_verif':password_new_verif
            })
    })
    let json = await response.json()

    return json
}

export const GetUserInfoAPI = async (token) => {

    let response = await fetch('http://edu.project.etherial.fr/users/me',{
            method:'GET',
            headers:{
                'Authorization': 'Bearer '+token, 
            }
        })
    let json = await response.json()

    return json
}

export const CreateArtcileAPI = async ({title,content,article_category_id}) => {

    let response = await fetch('http://edu.project.etherial.fr/articles',{
            method:'POST',
            headers:{
                'Authorization': 'Bearer '+getToken(),
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'title':title,
                'content':content,
                'article_category_id': article_category_id,
            })
        })
    let json = await response.json()

    return json
}

export const GetArtcileCategoriesAPI = async () => {

    let response = await fetch('http://edu.project.etherial.fr/articles/categories',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
    })
    let json = await response.json()

    return json
}

export const GetArtcilesAPI = async ({limit,offset}) => {

    let response = await fetch(`http://edu.project.etherial.fr/articles?limit=${limit}&offset=${offset}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
    })
    let json = await response.json()

    return json
}

export const GetArtcileAPI = async (id) => {

    let response = await fetch(`http://edu.project.etherial.fr/articles/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
    })
    let json = await response.json()

    return json
}