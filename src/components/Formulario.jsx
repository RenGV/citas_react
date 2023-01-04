//rafce
import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState(''); // El Hook siempre debe estar al inicio y no se pueden usar condicionales
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false)


  useEffect(()=>{
    if(Object.keys(paciente).length>0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])


  const generarId = ()=>{
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random+fecha
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    //Validación del formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log("Hay almenos un campo vacío")
      setError(true)
      return;
    }
    setError(false)

    //Objeto de Paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    //Verificar si edita o agrega paciente
    if(paciente.id){
      //Editando registro
      objetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id ===
        paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({})

    }else{
      //Nuevo registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }

    //console.log(objetoPaciente)


    //Reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Añade Pacientes y {''}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form onSubmit={handleSubmit}
      className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>

        {/* && -> if sin else */}
        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='mascota'>Nombre Mascota</label>
          <input id='mascota' value={nombre} onChange={(e)=>setNombre(e.target.value)} className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="text" placeholder='Nombre de la mascota' />
        </div>
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='propietario'>Nombre Propietario</label>
          <input id='propietario' value={propietario} onChange={(e)=>setPropietario(e.target.value)}  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="text" placeholder='Nombre del propietario' />
        </div>
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='email'>Email</label>
          <input id='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="email" placeholder='Email Contacto Propietario' />
        </div>
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='alta'>Alta</label>
          <input id='alta' value={fecha} onChange={(e)=>setFecha(e.target.value)} className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="date" />
        </div>
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='sintomas'>Síntomas</label>
          <textarea id="sintomas" value={sintomas} onChange={(e)=>setSintomas(e.target.value)}  className='border-2 w-full p-2 mt-2' placeholder='Describe los síntomas' />
        </div>
        <input type="submit" className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
         value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' } />
      </form>
    </div>
  )
}

export default Formulario