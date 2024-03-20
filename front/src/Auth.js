const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    if (token) {
      console.log('Token encontrado:', token);
      return true
    } else {
        console.log('Token NÃO encontrado');  
      return false
    }
}

export default isAuthenticated;