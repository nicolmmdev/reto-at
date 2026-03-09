export default function ProfileData(){

  return(






  <main className="content">

    <div className="profileCard">

      <h2>Mi perfil</h2>

      {/* TABS */}

      <div className="profileTabs">

        <button className="active">Datos</button>
        <button>Cambio de contraseña</button>
        <button>Notificaciones</button>
        <button>Autoexclusión y límites</button>

      </div>


      {/* GRID DE DATOS */}

      <div className="profileGrid">

        <div>
          <label>Nombres</label>
          <p>Nicol Lesly</p>
        </div>

        <div>
          <label>Apellidos</label>
          <p>Mendoza Mattos</p>
        </div>

        <div>
          <label>Tipo de Documento</label>
          <p>DNI</p>
        </div>

        <div>
          <label>Número de Documento</label>
          <p>76958900</p>
        </div>

        <div>
          <label>Fecha de Nacimiento</label>
          <p>04-11-1996</p>
        </div>

        <div>
          <label>Sexo</label>
          <p>Femenino</p>
        </div>

        <div>
          <label>Celular</label>
          <p>957169140</p>
        </div>

        <div>
          <label>País</label>
          <p>Peru</p>
        </div>

        <div>
          <label>Ciudad</label>
          <p>SAN JUAN DE LURIGANCHO</p>
        </div>

        <div>
          <label>Dirección</label>
          <p>avenida piedra luna...</p>
        </div>

      </div>

    </div>

  </main>


  )
}