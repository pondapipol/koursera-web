import { Grid } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import React from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      // position: "absolute",
      bottom: "0",
      display: "flex",
      width: "100%",
      Top: `${document.body.scrollHeight}`,
      padding: "4vw 0 4vw 0",
      justifyContent: "center",
      marginTop: "5vh",
      backgroundColor: "rgba(31, 38, 135, 0.1)",
    },
  })
);

interface footer {}

export const Footer: React.FC<footer> = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <div className={classes.footer}>
        <div className="inner-footer">© 2021 KOURSERA</div>
      </div>
    </Grid>
  );
};
