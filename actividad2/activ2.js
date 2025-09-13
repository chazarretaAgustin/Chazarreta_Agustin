async function procesarDatosSecuencial(){
    console.log(`Secuencial\n`);
    try{
        let lista = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const lista2 = await lista.json();
        const users = lista2.slice(0, 3);
        //const users = lista2.filter((_, index) => index < 3);
        //console.log(users);
        for(var i=0; i<users.length; i++){
            const nbre = users[i].name 
            const id = users[i].id 
            try{
                let resp = await fetch (`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
                const resp2 = await resp.json();
                //console.log(resp2);
                const public = resp2.length;
                console.log(`${nbre} tiene ${public} publicaciones`);
            }catch(error){
                console.log(`Todo mal en el FOR !!${error}`);        
            }
        }
    } catch (error){
        console.log(`Todo mal Fuera del FOR!!${error}`);
    }
    console.log(`\n`);
}

async function procesarDatosConcurrente(){
    console.log(`Concurrente\n`);
    try{
        let lista = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const lista2 = await lista.json();
        const users = lista2.slice(0, 3);
        const urls=[];
        for(var i=0; i<users.length; i++){
            urls.push(`https://jsonplaceholder.typicode.com/posts?userId=${users[i].id}`);
        }
        const prom = urls.map(index => fetch(index).then(res => res.json()));
        const resultadosProm = await Promise.all(prom);
        //console.log(resultadosProm);
        for(var i=0; i<users.length; i++){
                const public = resultadosProm[i].length
                const nbre=users[i].name
                console.log(`${nbre} tiene ${public} publicaciones`);
            }
    }catch(error){
        console.log(`Tomo mal !! ${error}`)
    }
    console.log(`\n`);
}

async function ejecutarTodo(){
    await procesarDatosSecuencial();
    await procesarDatosConcurrente();
}

ejecutarTodo();