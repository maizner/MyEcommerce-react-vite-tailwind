// Definimos una función llamada useLS que no toma argumentos.
const useLocalStorage = () => {

    // Función interna para guardar un elemento en localStorage.
    const saveItems = (key, defaultValue) => {

        const valueinLocalStorage = localStorage.getItem(key);
        let parsedValue;

        if (!valueinLocalStorage){

            // Si no existe, inicializa el elemento con un valor por defecto.
            localStorage.setItem('account', JSON.stringify({}));
            parsedValue = defaultValue; // Asigna el valor por defecto.
        }else{
            // Si existe, lo parsea y lo asigna.
            parsedValue = JSON.parse(valueinLocalStorage);
        }

        return parsedValue; // Retorna el valor parseado o el por defecto.

    }

    // Llama a saveItems para 'account' y 'sign-out' con sus valores por defecto.
    const parsedAccount = saveItems('account', {});
    const parsedSignOut = saveItems('sign-out', false);
        
    return { parsedAccount, parsedSignOut };
}
export { useLocalStorage }

// const account = { name: 'maia' , email: 'maiaaizner@gmail.com',password: '1234'};
// localStorage.setItem('account', JSON.stringify(account));

// localStorage.removeItem('account')