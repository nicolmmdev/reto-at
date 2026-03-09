export default function ProfileInfo(){

  const user={
    firstName:"Nicol Lesly",
    lastName:"Mendoza Mattos",
    dni:"76958900",
    birthDate:"04-11-1996",
    phone:"957169140",
    city:"San Juan de Lurigancho",
    email:"nicol.mendoza@delfosti.com"
  }

  return(

    <div className="profileInfo">

      <div className="row">
        <label>Nombres</label>
        <span>{user.firstName}</span>
      </div>

      <div className="row">
        <label>Apellidos</label>
        <span>{user.lastName}</span>
      </div>

      <div className="row">
        <label>DNI</label>
        <span>{user.dni}</span>
      </div>

      <div className="row">
        <label>Fecha de nacimiento</label>
        <span>{user.birthDate}</span>
      </div>

      <div className="row">
        <label>Celular</label>
        <span>{user.phone}</span>
      </div>

      <div className="row">
        <label>Email</label>
        <span>{user.email}</span>
      </div>

    </div>
  )
}