export const Register = () => {
    return (
        <div className="register">
            <form>
                <h3>Registrarse</h3>
                <div>
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input type="text" placeholder="ingresa tu nombre" className="form-control" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="ingresa tu correo" className="form-control" />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" placeholder="ingresa tu contraseña" className="form-control" />
                </div>
            </form>
        </div>
    )
}