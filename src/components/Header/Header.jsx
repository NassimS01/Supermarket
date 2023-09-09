import { useEffect, useState } from "react";
import { ButtonLink, Wrapper } from "./Wrapper";
import logoClickMarket from "../../assets/CLICK.png";
import {
  AiOutlineSearch,
  AiOutlineMenuUnfold,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineHeart,
} from "react-icons/ai";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import LinkItem from "../LinkItem/LinkItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { fetchFilteredCategories } from "../../redux/actions/categories";
import {
  alertTime,
  alertConfirmCancel,
} from "../../utils/alerts";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, userCart, userWishlist } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    setDropdownOpen(false);
  }

  function toggleDropdown() {
    setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen);
  }

  
  function closeMenu() {
    setMenuOpen(false);
  }

  const handleWishlist = () => {
    if (isAuthenticated) {
      navigate("profile/wishlist");
    } else {
      navigate("/login");
      alertTime(
        "Debes iniciar sesion para usar esta funcionalidad",
        "error",
        "var(--colorPrimary)",
        "white",
        ""
      );
    }
  };


  const handleCart = () => {
    if (isAuthenticated) {
      navigate("profile/cart");
    } else {
      navigate("/login");
      alertTime(
        "Debes iniciar sesion para usar esta funcionalidad",
        "error",
        "var(--colorPrimary)",
        "white"
      );
    }
  };

  const logoutHandler = () => {
    alertConfirmCancel(
      "",
      "Estás a punto de cerrar sesión",
      "question",
      "Sí!",
      "No!",
      () => {
        axios
          .get(`${server}/user/logout`, { withCredentials: true })
          .then((res) => {
            alertTime(
              res.data.message,
              "success",
              "var(--colorSuccess)",
              "white"
            );
            const interval = setInterval(() => {
              navigate("/");
              window.location.reload(true);
            }, 2000);
          })
          .catch((error) => {
            alertTime(
              error.response.data.message,
              "error",
              "var(--colorPrimary)",
              "white"
            );
          });
      }
    );
  };

  const filteredCategories = useSelector(
    (state) => state.categories.filteredCategories
  );

  useEffect(() => {
    dispatch(fetchFilteredCategories());
  }, [dispatch]);

  const location = useLocation();

  const pathnameSegments = location.pathname.split("/");
  const segment = pathnameSegments[pathnameSegments.length - 1];
  const lastSegment = Object.keys(filteredCategories).includes(segment)
    ? `${segment}`
    : "todos";
  const urlCategory = `/categorias/${lastSegment}`;

  return (
    <Wrapper>
      <button className="btn search-btn" id="search-btn">
        <AiOutlineSearch />
      </button>

      <div className="logo" onClick={() => navigate("/")}>
        <img src={logoClickMarket} alt="Logo Click Market" />
      </div>

      <button
        className={`btn menu-btn ${menuOpen ? "open" : ""}`}
        id="menu-btn"
        onClick={toggleMenu}
      >
        <AiOutlineMenuUnfold />
      </button>
      <nav className={`nav-links ${menuOpen ? "show" : ""}`} id="nav-links">
        <LinkItem to="/" onClick={closeMenu}>
          Inicio
        </LinkItem>
        <LinkItem to={urlCategory}>Categorias</LinkItem>
        <LinkItem to="/contacto" onClick={closeMenu}>
          Contacto
        </LinkItem>
        {user?.role === "Admin" ? (
          <LinkItem to="/panel-admin" onClick={closeMenu}>
            Panel Administrativo
          </LinkItem>
        ) : (
          ""
        )}
        {user?.role === "user" ? (
          <LinkItem to="/profile/orders" onClick={closeMenu}>
            Pedidos
          </LinkItem>
        ) : (
          ""
        )}
        <a href="https://www.google.com/" target="_blank"></a>
        <div className="social-links">
          <ButtonLink onClick={handleWishlist} rel="noopener noreferrer">
            <AiOutlineHeart className="icon" />
            <span>{userWishlist && userWishlist.length}</span>
          </ButtonLink>
          <ButtonLink onClick={handleCart} rel="noopener noreferrer">
            <AiOutlineShoppingCart className="icon" />
            <span>{userCart && userCart.length}</span>
          </ButtonLink>

          <ButtonLink onClick={toggleDropdown}>
            {isAuthenticated ? (
              <div className="user-dropdown">
                <img
                  src={`${user?.avatar?.url}`}
                  className="user-avatar"
                  alt=""
                />
                {dropdownOpen && (
                  <div className="dropdown-content">
                    {user?.role === "Admin" ? (
                      <>
                        <Link
                          to="/panel-admin"
                          className="btn-dropdown"
                          onClick={closeMenu}
                        >
                          Panel Administrador
                        </Link>
                        <button
                          onClick={logoutHandler}
                          className="btn-dropdown"
                        >
                          Cerrar Sesión
                        </button>
                      </>
                    ) : (
                      <div className="container-buttons-user">
                        <button
                          onClick={
                            (() => navigate("/profile/settings"), { closeMenu })
                          }
                          className="btn-dropdown"
                        >
                          Perfil
                        </button>
                        <button
                          onClick={logoutHandler}
                          className="btn-dropdown"
                        >
                          Cerrar Sesión
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <ButtonLink onClick={(() => navigate("/login"), { closeMenu })}>
                <AiOutlineUser className="icon" />
              </ButtonLink>
            )}
          </ButtonLink>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Header;