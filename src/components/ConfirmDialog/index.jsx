import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function ConfirmDialog({
  show = false,
  title,
  message,
  onAgree = () => { },
  onDisagree = () => { }
}) {
  return (
    <>
      <Dialog
        open={Boolean(show)}
        onClose={onDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title && <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>}
        {message && <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>}
        <DialogActions>
          <Button onClick={onDisagree} color="error">Disagree</Button>
          <Button onClick={onAgree} color="success" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
