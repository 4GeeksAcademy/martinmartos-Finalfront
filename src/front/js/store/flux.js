const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			personajes:[],
			naves:[],
			planetas:[],
			detallePersonajes:{},
			detalleNaves:{},
			detallePlanetas:{},
			uidPersonajes: '',
			uidNaves: '',
			uidPlanetas:'',
			hostStarWars: "https://www.swapi.tech/api",
			host: "https://playground.4geeks.com/contact/agendas",
			favorites: [],
			contacts: [],
			currentContact: {},
			isLogged: false, 
			user: null,
		},
		actions: {
			setIsLogged: (value) => { setStore({ isLogged: value }) },
			setUser: (currentUser) => { setStore({ user: currentUser }) },
			login: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/login`
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
				console.log(options);
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error:', response.status, response.statusText);
					return
				}
				const data = await response.json()
				localStorage.setItem('token', data.access_token)
				localStorage.setItem('user', JSON.stringify(data.results))
				setStore({
					isLogged: true,
					user: data.results
				})
			},
			signup: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/signup`
				console.log(dataToSend)
				const response = await fetch(uri, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				})

				if (!response.ok) {
					console.error("Error en el registro:", response.statusText);
					return null;
				}

				const body = {
					email: dataToSend.email,
					password: dataToSend.password,
				}

				const loginResponse = await getActions().login(body)
				return loginResponse
			},
			logout: () => {
				localStorage.clear()
				setStore({ 
					user: null,
					isLogged: false, 
				 })
			},
			getFromLocalStorage: (key) => {
				const data = localStorage.getItem(key)
				return JSON.parse(data)
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			setCurrentContact: (item) => {setStore({currentContact: item})},
			getCharacters: async () => {
				const uri = `${getStore().hostStarWars}/people`;	
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json();
				setStore({ personajes: data.results });
				localStorage.setItem( 'personajes', JSON.stringify(data.results) );
			},
			getDetalleCharacters: async (uid) => {
				const uri = `${getStore().hostStarWars}/people/${uid}`;
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json();
				setStore({detallePersonajes: data.result.properties});
			},
			getNaves: async () => {
				const uri = `${getStore().hostStarWars}/starships`;	
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json();
				setStore({ naves: data.results });
				localStorage.setItem( 'naves', JSON.stringify(data.results) );
			},
			getDetalleNaves: async (uid) => {
				const uri = `${getStore().hostStarWars}/starships/${uid}`;
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
	
				const data = await response.json();
				setStore({ detalleNaves: data.result.properties });
			},
			getPlanetas: async () => {
				const uri = `${getStore().hostStarWars}/planets`;	
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json();
				setStore({ planetas: data.results });
				localStorage.setItem( 'planetas', JSON.stringify(data.results) );
			},	
			getDetallePlanetas: async (uid) => {
				const uri = `${getStore().hostStarWars}/planets/${uid}`;
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json();
				setStore({ detallePlanetas: data.result.properties });
			},
			addFavorites: (item) =>{
				const favorites = getStore().favorites;
				if(!favorites.includes(item)){
				setStore({favorites: [...getStore().favorites,item]});
				}
			},
			removeFavorites: (item) =>{
				const favorites = getStore().favorites;
				setStore({favorites:favorites.filter((favorite) => favorite != item)})
			},		
			createAgenda: async () => {
				const uri = `${getStore().host}/${getStore().user}`;
				const options = {
					method: "POST"
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error("Error: ", response.status, response.statusText);
					return;
				}
				const response2 = await fetch(uri);
				const data = await response2.json();
				setStore({contacts: data.contacts});
			},
			getContact: async () => {
				const uri = `${getStore().host}/${getStore().user}`;
				const options = {
					method: "GET"
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					if (response.status == 404) {
						getActions().createAgenda()
					} else {
						console.error("Error: ", response.status, response.statusText);
					}
					return;
				}
				const data = await response.json();
				setStore({contacts: data.contacts});
			},
			createContact: async (dataToSend) => {
				const uri = `${getStore().host}/${getStore().user}/contacts`;
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error("Error: ", response.status, response.statusText);
					return;
				}
				getActions().getContact()
			},
			updateContact: async (id, contact) => {
				const uri = `${getStore().host}/${getStore().user}/contacts/${id}`
				const options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contact)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error("Error: ", response.status, response.statusText);
					return;
				}
				getActions().getContact();
			},
			deleteContact: async (id) => {
				const uri = `${getStore().host}/${getStore().user}/contacts/${id}`
				const options = {
					method: "DELETE"
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error("Error: ", response.status, response.statusText);
					return;
				}
				getActions().getContact();
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
		}
	};
}

export default getState;