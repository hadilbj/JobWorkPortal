import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../../components/iconify";
import Select from "react-select";
import Axios from "axios";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [showCompanyList, setShowCompanyList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailReceived, setEmailReceived] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [error, setError] = useState("");

  const handleRoleChange = (selectedOption) => {
    const selectedRole = selectedOption ? selectedOption.value : "";
    setRole(selectedRole);
    setCompanyName("");
    setShowCompanyList(selectedRole !== "");
  };

  const handleCompanyChange = (selectedOption) => {
    setCompanyName(selectedOption ? selectedOption.value : "");
  };

  const handleClick = () => {
    if (role && companyName) {
      setShowModal(true);
    } else {
      setError("Veuillez remplir tous les champs.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (emailReceived) {
      navigate("/dashboard", { replace: true });
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterUser = (event) => {
    event.preventDefault();
    fetchRegisterUser();
  };

  const options = [
    { value: "Lavage", label: "Lavage" },
    { value: "Confection", label: "Confection" },
    { value: "Broderie", label: "Broderie" },
    { value: "Impression", label: "Impression" },
    { value: "Finission", label: "Finission" },
  ];

  const companyOptions = [
    { value: "societe1", label: "Société 1" },
    { value: "societe2", label: "Société 2" },
    { value: "societe3", label: "Société 3" },
  ];

  const fetchRegisterUser = () => {
    const userData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    Axios.post("http://localhost:5050/user/register", userData)
      .then((res) => {
        setIsUserCreated(true);
        setEmailReceived(true);
        setError("");
      })
      .catch((error) => {
        setIsUserCreated(false);
        setError("Erreur lors de la création de l'utilisateur.");
        console.error("Error creating user:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleRegisterUser}>
        <Stack spacing={3}>
          {/* Champs de saisie */}
          <div>
            <TextField
              style={{ marginRight: "5%" }}
              name="first name"
              label="Prénom"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <TextField
              name="last name"
              label="Nom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <TextField
            name="email"
            label="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            name="password"
            label="Nouveau mot de passe"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Select
            options={options}
            onChange={handleRoleChange}
            placeholder="Choisir un rôle"
          />
          {showCompanyList && (
            <Select
              options={companyOptions}
              onChange={handleCompanyChange}
              placeholder="Choisir une société"
            />
          )}
        </Stack>
      </form>

      <br />
      {/* Bouton "Envoyer une demande" */}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Envoyer une demande
      </LoadingButton>

      {/* Modal de confirmation */}
      <Dialog open={showModal} onClose={handleModalClose}>
        <DialogTitle>Demande envoyée</DialogTitle>
        <DialogContent>
          {emailReceived ? (
            <p>
              Votre demande a été envoyée avec succès. Vous pouvez maintenant
              vous connecter.
            </p>
          ) : (
            <p>
              Votre demande a été envoyée avec succès. Vous recevrez bientôt un
              courriel de confirmation.
            </p>
          )}
          <p>Merci de vous être inscrit !</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Fermer</Button>

          <Button onClick={handleLoginClick}>
            Aller à la page de connexion
          </Button>
        </DialogActions>
      </Dialog>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
