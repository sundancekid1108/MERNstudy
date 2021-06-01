import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
} from "../../../../Components/Index";

import styles from "./Styles";

const AccountDetails = (props) => {
  const { user, classes, className, ...rest } = props;
  const rootClassName = classNames(classes.root, className);
  return (
    <>
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel
            subtitle="The information can be edited"
            title="Profile"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Please specify the username"
                label="UserName"
                margin="dense"
                required
                // value={firstname}
                variant="outlined"
                // onChange={(event) =>
                //   this.handleFieldChange("firstname", event.target.value)
                // }
              />
              <TextField
                className={classes.textField}
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                required
                // value={firstname}
                variant="outlined"
                // onChange={(event) =>
                //   this.handleFieldChange("firstname", event.target.value)
                // }
              />
              <TextField
                className={classes.textField}
                label="Last name"
                margin="dense"
                required
                // value={lastname}
                variant="outlined"
                // onChange={(event) =>
                //   this.handleFieldChange("lastname", event.target.value)
                // }
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Email Address"
                margin="dense"
                required
                // value={email}
                variant="outlined"
                // onChange={(event) =>
                //   this.handleFieldChange("email", event.target.value)
                // }
              />
              <TextField
                className={classes.textField}
                label="Phone Number"
                margin="dense"
                type="number"
                // value={phone}
                variant="outlined"
                // onChange={(event) =>
                //   this.handleFieldChange("phone", event.target.value)
                // }
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="contained"
            // onClick={this.onUpdateUser}
          >
            Save details
          </Button>
        </PortletFooter>
      </Portlet>
    </>
  );
};

export default withStyles(styles)(AccountDetails);
