"use client"

import { useSession } from "next-auth/react"

export default function ProfileData(){

  const { data: session } = useSession()

  const user = session?.user

  return(

  <main className="content">

    <div className="profileCard">

      <h2>Mi perfil</h2>

      <div className="profileTabs">
        <button className="active">Datos</button>
      </div>

      <div className="profileGrid">

        <div>
          <label>Nombres</label>
          <p>{user?.name}</p>
        </div>

        <div>
          <label>Apellidos</label>
          <p>{user?.lastName}</p>
        </div>

        <div>
          <label>Tipo de Documento</label>
          <p>{user?.documentType}</p>
        </div>

        <div>
          <label>Número de Documento</label>
          <p>{user?.documentNumber}</p>
        </div>

        <div>
          <label>Fecha de Nacimiento</label>
          <p>{user?.birthDate}</p>
        </div>

        <div>
          <label>Sexo</label>
          <p>{user?.gender}</p>
        </div>

        <div>
          <label>Celular</label>
          <p>{user?.phone}</p>
        </div>

        <div>
          <label>País</label>
          <p>{user?.country}</p>
        </div>

        <div>
          <label>Ciudad</label>
          <p>{user?.city}</p>
        </div>

        <div>
          <label>Dirección</label>
          <p>{user?.address}</p>
        </div>

      </div>

    </div>

  </main>

  )
}