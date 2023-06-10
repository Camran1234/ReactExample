function MenuAdmin(props) {
  const handleLogout = () => {
    localStorage.removeItem('admin');
    props.onLogout();
  };

  return (
    <div>
      <h1>Bienvenido al menú del admin</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default MenuAdmin;