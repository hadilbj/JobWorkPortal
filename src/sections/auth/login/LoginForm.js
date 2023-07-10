import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
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
// components
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [emailReceived, setEmailReceived] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (emailReceived) {
      navigate("/dashboard", { replace: true });
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Adresse email" />

        <TextField
          name="password"
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
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
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Mot de passe oublié ?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Connecter
      </LoadingButton>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Impossible de se connecter</DialogTitle>
        <DialogContent>
          <p>
            Vous ne pouvez pas connecter qu'après avoir reçu l'email de
            confirmation.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
