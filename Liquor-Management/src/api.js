import axios from 'axios';

let axiosClient = undefined;

class ApiCore {

  constructor (BASE_URL) {
    axiosClient = axios.create({baseURL:BASE_URL});    
  }

  static handleError (error) {
    // handle error
    console.log(error);
  }

  get ()  { 
    return axiosClient(`${this.BASE_URL}`) 
      .then(resp => resp.data) 
      .catch(this.handleError); 
  }; 

  getAll (resource)  { 
    return axiosClient(`${this.BASE_URL}/${resource}`) 
      .then(resp => resp.data) 
      .catch(this.handleError); 
  }; 

  getSingle (resource, id) { 
    return axiosClient 
      .get(`${this.BASE_URL}/${resource}/${id}`) 
      .then(resp => resp.data) 
      .catch(this.handleError); 
  }; 

  post (resource, model) { 
    return axiosClient 
      .post(`${this.BASE_URL}/${resource}`, model) 
      .then(resp => resp.data) 
      .catch(this.handleError); 
  }; 

  patch (resource, model) { 
    return axiosClient 
      .patch(`${this.BASE_URL}/${resource}`, model) 
      .then(resp => resp.data) 
      .catch(this.handleError); 
  }; 

  remove (resource, id) { 
    return axiosClient 
      .delete(`${this.BASE_URL}/${resource}/${id}`, id) 
      .then(resp => resp.data) 
      .catch(this.handleError); 
  }; 
}
export default new ApiCore('http://127.0.0.1:8080');