import React, { useReducer } from "react";
import { Box, Grid, Paper, Typography, List } from "@mui/material";
import MainContainer from "../../components/ui/container/MainContainer";
import { APP_TEXT } from "../../utils/DefaultAppText.utils";
import MuiListItem from "../../components/ui/container/ListItem";
import PageTitle from "../../components/ui/container/PageTitle";
import UserType from "./user-type/UserType";

const styles = {
  paper: {
    borderRadius: "10px",
    bgcolor: "white",
    height: 600,
  },
  title: {
    fontWeight: "500",
    borderBottom: "1px solid #ccc",
    p: 1,
    pl: 2,
  },
  list: {
    p: "18px",
  },
};

const initialState = {
  userTypeOpen: false,
};

const reducer = (state: any, action: any) => {
  return {
    ...state,
    [action.type]: !state[action.type],
  };
};

const Setting = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    MASTER_SETTINGS,

    USER_TYPE,
  } = APP_TEXT.settings;

  const categories = [
    {
      title: MASTER_SETTINGS,
      items: [
        {
          key: "userTypeOpen",
          title: USER_TYPE,
          children: state.userTypeOpen && (
            <UserType
              label={USER_TYPE}
              state={state.userTypeOpen}
              toggleDrawer={() => dispatch({ type: "userTypeOpen" })}
            />
          ),
        },
      ],
    },
  ];

  return (
    <MainContainer>
      <PageTitle title={APP_TEXT.sidebar.SETTINGS} />
      <Box>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={2} sx={styles.paper}>
                <Typography variant="h6" sx={styles.title}>
                  {category.title}
                </Typography>

                <List sx={styles.list}>
                  {category.items.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <MuiListItem
                        label={item.title}
                        onClick={() => dispatch({ type: item.key })}
                      />
                      {item.children} 
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainContainer>
  );
};

export default Setting;
