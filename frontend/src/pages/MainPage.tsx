import { createDrinkRequest, getDrinkRequest, 
    getDrinksRequest, editDrinkRequest, deleteDrinkRequest} from "../api/general"
import { useState,Fragment} from "react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/auth.ts';
import { Menu, Transition } from '@headlessui/react';
import { Link } from  'react-router-dom';
import Logo from '../assets/back01.png';
import MpLogo from '../assets/mercadopago.svg';




export interface Drink{
    name:string,
    price:number,
    id:number,
}




const MainPage = ()=>{
    const { isAuth } = useAuthStore();
    const queryClient  = useQueryClient();
    const[name, setName] = useState("");
    const[price, setPrice] = useState();
    const[show, setShow] = useState(false);     
    const[name2, setName2] = useState("");
    const[price2, setPrice2] = useState();
    const[show2, setShow2] = useState(false);
    const[IdToEdit, setIdToEdit] = useState(0);
    const [copied, setCopied] = useState(false);  
    const notify = () => toast.success('¡Alias Copiado!', {
      style: {
    border: '1px solid #800080',
    padding: '8px',
    color: '#800080',
    background:'black',
  },  
  iconTheme: {
    primary: '#800080',
    secondary: '#FFFAEE',
  },

    });

    function logOutFun() {
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }


    const {data, error} = useQuery({
        queryKey:['drink'],
         queryFn: getDrinksRequest
    });

    

    
    const createDrinkMutation = useMutation({
        mutationFn: () => createDrinkRequest(name, price),
        onSuccess: () => {
          queryClient.invalidateQueries(["drink"]) 
          setShow(false);
        },
    
        onError: (error) => {
          if (typeof error === 'string') {
            console.log(error);
          }
        },
      });

const editDrinkMutation = useMutation({
        mutationFn: editDrinkRequest,
        onSuccess: () => {
          queryClient.invalidateQueries(["drink"]) 
          setShow2(false);
        },
    
        onError: (error) => {
          if (typeof error === 'string') {
            console.log(error);
          }
        },
      });

const deleteDrinkMutation = useMutation({
        mutationFn:deleteDrinkRequest,
        onSuccess: ()=>{
          queryClient.invalidateQueries(["drink"]) 
          toast.success("Borrado!");
        },
        onError: (error) => {
          console.error(error);
        },
      })
    

const handleSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  createDrinkMutation.mutate();
}

const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  editDrinkMutation.mutate({
    id: IdToEdit,
    name: name2,
    price: price2,
  });
}

const openEditForm = (id: number,name2:string,price2:number ) => {
  setShow2(true);
  // Guardar el ID del elemento en un estado si es necesario
  setIdToEdit(id);
  setName2(name2)
  setPrice2(price2)

}



 const copyAliasToClipboard = () => {
    const aliasToCopy = "Lausinanew.mp";
    navigator.clipboard.writeText(aliasToCopy)
      .then(() => {
        notify();
      })
      .catch(err => {
        console.error('Error al copiar el alias: ', err);
      });
  };


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
      if (error instanceof Error) return <>{toast.error(error.message)}</>

    return(
        <>
        {isAuth ? (
        

        
        <div className="min-h-screen bg-black text-xl font-display ">
          
          {show2 && 
          <div className="z-50 flex flex-row justify-center items-center fixed top-0 left-0 w-full h-full text-black ">
  <div className=" border-2 border-fuchsia-950 rounded-xl absolute bg-white max-sm:w-11/12">
    <div className="justiy-end relative">
    <svg xmlns="http://www.w3.org/2000/svg" className=" h-7 w-7 absolute right-0 hover:bg-gray-50 rounded-lg cursor-pointer hover:text-gray-500 transition duration-75 py-1 " viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => setShow2(false)}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
    </div>
    <div className=" py-2">
      <form className="" onSubmit={handleEditSubmit}>
        <div className="flex flex-row mb-2">
          <input
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            type="text"
            name="rooms_number"
            id="rooms_number"
            className="sm:text-md  overflow-hidden border-b border-slate-100 transition duration-50 block p-1.5 sm:p-2 md:p-2.5 focus:border-b-2 focus:border-black placeholder-slate-700 focus focus:outline-none bg-transparent"
            placeholder="Bebida"
          />  
          <input
            value={price2}
            onChange={(e) => setPrice2(parseFloat(e.target.value))}
            type="number"
            name="price"
            id="price"
            className="sm:text-md  overflow-hidden border-b border-slate-100 transition duration-50 block p-1.5 sm:p-2 md:p-2.5 focus:border-b-2 focus:border-black placeholder-slate-700 focus focus:outline-none bg-transparent"
            placeholder="$0000"
          />
        </div>
        <div className="flex items-center justify-end mx-4">
          <button type="submit" className=" w-1/4 p-1 text-white bg-black hover:bg-gray-900 text-sm mb-2 text-center transition duration-25 rounded-full">Crear</button>
        </div>
      </form>
    </div>
  </div>
</div>
          
          }


          {show &&
          
           <div className="z-50 flex flex-row justify-center items-center fixed top-0 left-0 w-full h-full text-black">
  <div className=" border-2 border-fuchsia-950 rounded-xl absolute bg-white max-sm:w-11/12">
    <div className="justiy-end relative">
    <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6 absolute right-0 hover:bg-gray-50 rounded-lg cursor-pointer hover:text-gray-500 transition duration-75 py-1 " viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => setShow(false)}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
    </div>
    <div className="px-4 py-2">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-row mb-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="rooms_number"
            id="rooms_number"
            className=" overflow-hidden sm:text-md border-b border-slate-100 transition duration-50 block p-1.5 sm:p-2 md:p-2.5 focus:border-b-2 focus:border-black placeholder-slate-500 focus focus:outline-none bg-transparent"
            placeholder="Bebida"
          />
          <input
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            type="number"
            name="price"
            id="price"
            className=" overflow-hidden sm:text-md border-b border-slate-100 transition duration-50 block p-1.5 sm:p-2 md:p-2.5 focus:border-b-2 focus:border-black placeholder-slate-500 focus focus:outline-none bg-transparent"
            placeholder="$0000"
          />
        </div>
        <div className="flex items-center justify-end">
          <button type="submit" className=" w-1/4 font-semibold p-1 text-white bg-black hover:bg-gray-900 text-sm mb-2 text-center transition duration-25 rounded-full">Crear</button>
        </div>
      </form>
    </div>
  </div>
</div>
          
          
          }
          <div className="">
          <Menu as="div" className="absolute right-2 top-2">
                      <div>
                        <Menu.Button className="text-sm right-0  ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-none stroke-white hover:stroke-gray-300 trasition duration-200" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>





                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 top-5 z-10 w-48 origin-top-right pointer-events-auto bg-white py-1 shadow-lgfocus:outline-none ring-1 ring-slate-400">
                          <Menu.Item>
                            {({ active }) => (                                
                              <span
                                onClick={logOutFun}
                                className={classNames(active ?'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                              >
                                Cerrar Sesión
                              </span>
                              
                            )}
                          </Menu.Item> 
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    
                    </div>
                    
          <div className="flex items-center text-2xl font-semibold text-gray-900 justify-center">
                    <img className="w-40 h-40 md:w-40 md:h-40 selection:bg-fuchsia-900 select-none" src={Logo} alt="logo"/>
                    </div>
                    <div className="text-white flex items-center text-4xl justify-center font-display">
                  <h1 className="selection:bg-fuchsia-900">Lista de Precios</h1>
                </div>
                
                <div className="flex flex-col items-center ring-fuchsia-950 pt-6 ">
                 {data?.map((drink: Drink) => (
                 
    <div className="h-14 border w-11/12 rounded-xl bg-white items-center md:w-5/12 my-1 grid grid-cols-3 relative" key={drink.id}>



      
      <p className="px-3 selection:bg-fuchsia-700 selection:text-white">
        {drink.name}
      </p>
      <p className=" text-start ml-24 selection:bg-fuchsia-700 selection:text-white">
        ${drink.price}
      </p>  
                  { (
                    <Menu as="div" className="absolute right-2 top-1/4 col-span-3">
                      <div>
                        <Menu.Button className="text-sm right-0">
                          <svg className="h-7 w-7 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
</svg>

                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className=" absolute right-0 top-5 z-10 w-48 origin-top-right pointer-events-auto bg-white py-1 shadow-lgfocus:outline-none ring-1 ring-fuchsia-950">
                          <Menu.Item>
                            {({ active }) => (                                
                              <span
                                onClick={() => openEditForm(drink.id, drink.name, drink.price)}
                                className={classNames(active ?'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                              >
                                Editar
                              </span>
                              
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                              onClick={() => {
                                 deleteDrinkMutation.mutate((drink.id));
                              }} 
                                className={classNames(active ? 'bg-gray-200  ' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                              >
                                  Eliminar
                              </span>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
  
                  )}
                
                                  
            </div>
            
            
             ))}
             </div>
            <div className="flex flex-col justify-center  items-center">
             <div className="block justify-center text-center items-center text-white mt-6 rounded-full hover:bg-gray-900 p-3 transition duration-150 hover:ring-2 hover:ring-fuchsia-950 cursor-pointer"
             onClick={()=>setShow(true)}
             >
                      <svg className="h-8 w-8 fill-white" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

                    </div>

              <div className="grid grid-cols-2">
            <div className="flex items-end justify-end">
             <div className="flex flex-col justify-center items-center px-2">
           
            <div className=" inline-block justify-center  border rounded-full  border-black text-center items-center p-2 mt-6 bg-black ring-2 ring-fuchsia-950 hover:ring-3 hover:ring-fuchsia-800 trasition duration-150">
              <a href="https://www.instagram.com/lausinanew?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="blank_">
          <svg className="fill-white h-12 w-12 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
          </a>
          </div>
           <a href="https://www.instagram.com/lausinanew?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="blank_">
            <p className="text-white mb-4 cursor-pointer hover:text-gray-200 selection:bg-fuchsia-900 text-sm"  >@lausinanew
            </p>
             </a>
             
        </div>
        </div>
        <div className=" relative cursor-pointer text-center justify-center" title="Copiar Alias"
        
        onClick={copyAliasToClipboard}
        >
    <Toaster />
              <svg className="fill-white h-16 w-16 text-center justify-center align-middle items-center absolute mb-9 bottom-0 hover:fill-gray-300 transition duration-150" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.115 16.479a.93.927 0 0 1-.939-.886c-.002-.042-.006-.155-.103-.155-.04 0-.074.023-.113.059-.112.103-.254.206-.46.206a.816.814 0 0 1-.305-.066c-.535-.214-.542-.578-.521-.725.006-.038.007-.08-.02-.11l-.032-.03h-.034c-.027 0-.055.012-.093.039a.788.786 0 0 1-.454.16.7.699 0 0 1-.253-.05c-.708-.27-.65-.928-.617-1.126.005-.041-.005-.072-.03-.092l-.05-.04-.047.043a.728.726 0 0 1-.505.203.73.728 0 0 1-.732-.725c0-.4.328-.722.732-.722.364 0 .675.27.721.63l.026.195.11-.165c.01-.018.307-.46.852-.46.102 0 .21.016.316.05.434.13.508.52.519.68.008.094.075.1.09.1.037 0 .064-.024.083-.045a.746.744 0 0 1 .54-.225c.128 0 .263.03.402.09.69.293.379 1.158.374 1.167-.058.144-.061.207-.005.244l.027.013h.02c.03 0 .07-.014.134-.035.093-.032.235-.08.367-.08a.944.942 0 0 1 .94.93.936.934 0 0 1-.94.928zm7.302-4.171c-1.138-.98-3.768-3.24-4.481-3.77-.406-.302-.685-.462-.928-.533a1.559 1.554 0 0 0-.456-.07c-.182 0-.376.032-.58.095-.46.145-.918.505-1.362.854l-.023.018c-.414.324-.84.66-1.164.73a1.986 1.98 0 0 1-.43.049c-.362 0-.687-.104-.81-.258-.02-.025-.007-.066.04-.125l.008-.008 1-1.067c.783-.774 1.525-1.506 3.23-1.545h.085c1.062 0 2.12.469 2.24.524a7.03 7.03 0 0 0 3.056.724c1.076 0 2.188-.263 3.354-.795a9.135 9.11 0 0 0-.405-.317c-1.025.44-2.003.66-2.946.66-.962 0-1.925-.229-2.858-.68-.05-.022-1.22-.567-2.44-.57-.032 0-.065 0-.096.002-1.434.033-2.24.536-2.782.976-.528.013-.982.138-1.388.25-.361.1-.673.186-.979.185-.125 0-.35-.01-.37-.012-.35-.01-2.115-.437-3.518-.962-.143.1-.28.203-.415.31 1.466.593 3.25 1.053 3.812 1.089.157.01.323.027.491.027.372 0 .744-.103 1.104-.203.213-.059.446-.123.692-.17l-.196.194-1.017 1.087c-.08.08-.254.294-.14.557a.705.703 0 0 0 .268.292c.243.162.677.27 1.08.271.152 0 .297-.015.43-.044.427-.095.874-.448 1.349-.82.377-.296.913-.672 1.323-.782a1.494 1.49 0 0 1 .37-.05.611.61 0 0 1 .095.005c.27.034.533.125 1.003.472.835.62 4.531 3.815 4.566 3.846.002.002.238.203.22.537-.007.186-.11.352-.294.466a.902.9 0 0 1-.484.15.804.802 0 0 1-.428-.124c-.014-.01-1.28-1.157-1.746-1.543-.074-.06-.146-.115-.22-.115a.122.122 0 0 0-.096.045c-.073.09.01.212.105.294l1.48 1.47c.002 0 .184.17.204.395.012.244-.106.447-.35.606a.957.955 0 0 1-.526.171.766.764 0 0 1-.42-.127l-.214-.206a21.035 20.978 0 0 0-1.08-1.009c-.072-.058-.148-.112-.221-.112a.127.127 0 0 0-.094.038c-.033.037-.056.103.028.212a.698.696 0 0 0 .075.083l1.078 1.198c.01.01.222.26.024.511l-.038.048a1.18 1.178 0 0 1-.1.096c-.184.15-.43.164-.527.164a.8.798 0 0 1-.147-.012c-.106-.018-.178-.048-.212-.089l-.013-.013c-.06-.06-.602-.609-1.054-.98-.059-.05-.133-.11-.21-.11a.128.128 0 0 0-.096.042c-.09.096.044.24.1.293l.92 1.003a.204.204 0 0 1-.033.062c-.033.044-.144.155-.479.196a.91.907 0 0 1-.122.007c-.345 0-.712-.164-.902-.264a1.343 1.34 0 0 0 .13-.576 1.368 1.365 0 0 0-1.42-1.357c.024-.342-.025-.99-.697-1.274a1.455 1.452 0 0 0-.575-.125c-.146 0-.287.025-.42.075a1.153 1.15 0 0 0-.671-.564 1.52 1.515 0 0 0-.494-.085c-.28 0-.537.08-.767.242a1.168 1.165 0 0 0-.903-.43 1.173 1.17 0 0 0-.82.335c-.287-.217-1.425-.93-4.467-1.613a17.39 17.344 0 0 1-.692-.189 4.822 4.82 0 0 0-.077.494l.67.157c3.108.682 4.136 1.391 4.309 1.525a1.145 1.142 0 0 0-.09.442 1.16 1.158 0 0 0 1.378 1.132c.096.467.406.821.879 1.003a1.165 1.162 0 0 0 .415.08c.09 0 .179-.012.266-.034.086.22.282.493.722.668a1.233 1.23 0 0 0 .457.094c.122 0 .241-.022.355-.063a1.373 1.37 0 0 0 1.269.841c.37.002.726-.147.985-.41.221.121.688.341 1.163.341.06 0 .118-.002.175-.01.47-.059.689-.24.789-.382a.571.57 0 0 0 .048-.078c.11.032.234.058.373.058.255 0 .501-.086.75-.265.244-.174.418-.424.444-.637v-.01c.083.017.167.026.251.026.265 0 .527-.082.773-.242.48-.31.562-.715.554-.98a1.28 1.279 0 0 0 .978-.194 1.04 1.04 0 0 0 .502-.808 1.088 1.085 0 0 0-.16-.653c.804-.342 2.636-1.003 4.795-1.483a4.734 4.721 0 0 0-.067-.492 27.742 27.667 0 0 0-5.049 1.62zm5.123-.763c0 4.027-5.166 7.293-11.537 7.293-6.372 0-11.538-3.266-11.538-7.293 0-4.028 5.165-7.293 11.539-7.293 6.371 0 11.537 3.265 11.537 7.293zm.46.004c0-4.272-5.374-7.755-12-7.755S.002 7.277.002 11.55L0 12.004c0 4.533 4.695 8.203 11.999 8.203 7.347 0 12-3.67 12-8.204z"/></svg>
             </div>
        </div>
        </div>      
        </div>
        
        ) : (
          
        <div className="min-h-screen bg-black text-xl scroll-smooth font-display ">
          <div className="flex justify-center ">
                    <img className="w-40 h-40 md:w-56 md:h-56 select-none"  src={Logo} alt="logo"/>
                </div>
                <div className="text-white flex items-center text-4xl justify-center font-display">
                  <h1 className="selection:bg-fuchsia-900">Lista de Precios</h1>
                </div>
            <div className="flex flex-col  items-center pt-6">

               {data?.map((drink: Drink) => (
    <div className="h-14 border w-11/12 rounded-xl bg-white items-center lg:w-5/12 my-1 grid grid-cols-2 ring-1 ring-fuchsia-950" key={drink.id}>
      <p className="px-3 selection:bg-fuchsia-700 selection:text-white">
        {drink.name}
      </p>
      <p className="px-3 selection:bg-fuchsia-700 selection:text-white">
        ${drink.price}
      </p>
    </div>
  ))}
            </div>
           <div className="grid grid-cols-2">
            <div className="flex items-end justify-end">
             <div className="flex flex-col justify-center items-center px-2">
           
            <div className=" inline-block justify-center  border rounded-full  border-black text-center items-center p-2 mt-6 bg-black ring-2 ring-fuchsia-950 hover:ring-3 hover:ring-fuchsia-800 trasition duration-150">
              <a href="https://www.instagram.com/lausinanew?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="blank_">
          <svg className="fill-white h-12 w-12 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
          </a>
          </div>
           <a href="https://www.instagram.com/lausinanew?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="blank_">
            <p className="text-white mb-4 cursor-pointer hover:text-gray-200 selection:bg-fuchsia-900 text-sm"  >@lausinanew
            </p>
             </a>
             
        </div>
        </div>
        <div className=" relative cursor-pointer text-center justify-center" title="Copiar Alias"
        
        onClick={copyAliasToClipboard}
        >
    <Toaster />
              <svg className="fill-white h-16 w-16 text-center justify-center align-middle items-center absolute mb-9 bottom-0 hover:fill-gray-300 transition duration-150" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.115 16.479a.93.927 0 0 1-.939-.886c-.002-.042-.006-.155-.103-.155-.04 0-.074.023-.113.059-.112.103-.254.206-.46.206a.816.814 0 0 1-.305-.066c-.535-.214-.542-.578-.521-.725.006-.038.007-.08-.02-.11l-.032-.03h-.034c-.027 0-.055.012-.093.039a.788.786 0 0 1-.454.16.7.699 0 0 1-.253-.05c-.708-.27-.65-.928-.617-1.126.005-.041-.005-.072-.03-.092l-.05-.04-.047.043a.728.726 0 0 1-.505.203.73.728 0 0 1-.732-.725c0-.4.328-.722.732-.722.364 0 .675.27.721.63l.026.195.11-.165c.01-.018.307-.46.852-.46.102 0 .21.016.316.05.434.13.508.52.519.68.008.094.075.1.09.1.037 0 .064-.024.083-.045a.746.744 0 0 1 .54-.225c.128 0 .263.03.402.09.69.293.379 1.158.374 1.167-.058.144-.061.207-.005.244l.027.013h.02c.03 0 .07-.014.134-.035.093-.032.235-.08.367-.08a.944.942 0 0 1 .94.93.936.934 0 0 1-.94.928zm7.302-4.171c-1.138-.98-3.768-3.24-4.481-3.77-.406-.302-.685-.462-.928-.533a1.559 1.554 0 0 0-.456-.07c-.182 0-.376.032-.58.095-.46.145-.918.505-1.362.854l-.023.018c-.414.324-.84.66-1.164.73a1.986 1.98 0 0 1-.43.049c-.362 0-.687-.104-.81-.258-.02-.025-.007-.066.04-.125l.008-.008 1-1.067c.783-.774 1.525-1.506 3.23-1.545h.085c1.062 0 2.12.469 2.24.524a7.03 7.03 0 0 0 3.056.724c1.076 0 2.188-.263 3.354-.795a9.135 9.11 0 0 0-.405-.317c-1.025.44-2.003.66-2.946.66-.962 0-1.925-.229-2.858-.68-.05-.022-1.22-.567-2.44-.57-.032 0-.065 0-.096.002-1.434.033-2.24.536-2.782.976-.528.013-.982.138-1.388.25-.361.1-.673.186-.979.185-.125 0-.35-.01-.37-.012-.35-.01-2.115-.437-3.518-.962-.143.1-.28.203-.415.31 1.466.593 3.25 1.053 3.812 1.089.157.01.323.027.491.027.372 0 .744-.103 1.104-.203.213-.059.446-.123.692-.17l-.196.194-1.017 1.087c-.08.08-.254.294-.14.557a.705.703 0 0 0 .268.292c.243.162.677.27 1.08.271.152 0 .297-.015.43-.044.427-.095.874-.448 1.349-.82.377-.296.913-.672 1.323-.782a1.494 1.49 0 0 1 .37-.05.611.61 0 0 1 .095.005c.27.034.533.125 1.003.472.835.62 4.531 3.815 4.566 3.846.002.002.238.203.22.537-.007.186-.11.352-.294.466a.902.9 0 0 1-.484.15.804.802 0 0 1-.428-.124c-.014-.01-1.28-1.157-1.746-1.543-.074-.06-.146-.115-.22-.115a.122.122 0 0 0-.096.045c-.073.09.01.212.105.294l1.48 1.47c.002 0 .184.17.204.395.012.244-.106.447-.35.606a.957.955 0 0 1-.526.171.766.764 0 0 1-.42-.127l-.214-.206a21.035 20.978 0 0 0-1.08-1.009c-.072-.058-.148-.112-.221-.112a.127.127 0 0 0-.094.038c-.033.037-.056.103.028.212a.698.696 0 0 0 .075.083l1.078 1.198c.01.01.222.26.024.511l-.038.048a1.18 1.178 0 0 1-.1.096c-.184.15-.43.164-.527.164a.8.798 0 0 1-.147-.012c-.106-.018-.178-.048-.212-.089l-.013-.013c-.06-.06-.602-.609-1.054-.98-.059-.05-.133-.11-.21-.11a.128.128 0 0 0-.096.042c-.09.096.044.24.1.293l.92 1.003a.204.204 0 0 1-.033.062c-.033.044-.144.155-.479.196a.91.907 0 0 1-.122.007c-.345 0-.712-.164-.902-.264a1.343 1.34 0 0 0 .13-.576 1.368 1.365 0 0 0-1.42-1.357c.024-.342-.025-.99-.697-1.274a1.455 1.452 0 0 0-.575-.125c-.146 0-.287.025-.42.075a1.153 1.15 0 0 0-.671-.564 1.52 1.515 0 0 0-.494-.085c-.28 0-.537.08-.767.242a1.168 1.165 0 0 0-.903-.43 1.173 1.17 0 0 0-.82.335c-.287-.217-1.425-.93-4.467-1.613a17.39 17.344 0 0 1-.692-.189 4.822 4.82 0 0 0-.077.494l.67.157c3.108.682 4.136 1.391 4.309 1.525a1.145 1.142 0 0 0-.09.442 1.16 1.158 0 0 0 1.378 1.132c.096.467.406.821.879 1.003a1.165 1.162 0 0 0 .415.08c.09 0 .179-.012.266-.034.086.22.282.493.722.668a1.233 1.23 0 0 0 .457.094c.122 0 .241-.022.355-.063a1.373 1.37 0 0 0 1.269.841c.37.002.726-.147.985-.41.221.121.688.341 1.163.341.06 0 .118-.002.175-.01.47-.059.689-.24.789-.382a.571.57 0 0 0 .048-.078c.11.032.234.058.373.058.255 0 .501-.086.75-.265.244-.174.418-.424.444-.637v-.01c.083.017.167.026.251.026.265 0 .527-.082.773-.242.48-.31.562-.715.554-.98a1.28 1.279 0 0 0 .978-.194 1.04 1.04 0 0 0 .502-.808 1.088 1.085 0 0 0-.16-.653c.804-.342 2.636-1.003 4.795-1.483a4.734 4.721 0 0 0-.067-.492 27.742 27.667 0 0 0-5.049 1.62zm5.123-.763c0 4.027-5.166 7.293-11.537 7.293-6.372 0-11.538-3.266-11.538-7.293 0-4.028 5.165-7.293 11.539-7.293 6.371 0 11.537 3.265 11.537 7.293zm.46.004c0-4.272-5.374-7.755-12-7.755S.002 7.277.002 11.55L0 12.004c0 4.533 4.695 8.203 11.999 8.203 7.347 0 12-3.67 12-8.204z"/></svg>
             </div>
        </div>
        </div>
          



        )}











        
        
        </>
    )
}


export default MainPage