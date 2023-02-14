import DashboardIcon from '@mui/icons-material/Dashboard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const MenuItem = () =>  {
  const users = useSelector((state) => state.login.res)

  let navigate = useNavigate()

  let MenuHumanResource = [
    {
      name: 'Halaman Utama',
      link: '/dashboard'
    },
    {
      name: 'Pusat Kontrol Akun',
      link: '/pusat-kontrol-akun'
    },
    {
      name: 'Pusat Kontrol AHP',
      link: '/pusat-kontrol-ahp'
    },
    {
      name: 'Sesi Seleksi Programmer',
      link: '/sesi-seleksi-programmer'
    },
  ]

  let MenuSeniorProgrammer = [
    {
      name: 'Halaman Utama',
      link: '/dashboard'
    },
    {
      name: 'Penilaian Kandidat',
      link: '/kandidat-belom-dinilai'
    },
  ]

  let MenuChiefExecutiveOfficer = [
    {
      name: 'Halaman Utama',
      link: '/dashboard'
    },
  ]

  return (
    <div>
        <Grid container 
        sx={{
            height: '70px',
            textAlign: "center",
        }}
        >
            <Grid xs={12}>
            <Typography fontSize={19} sx={{textAlign: 'center', height: '70px', justifyContent: "center", display: "flex", alignItems: "center"}}>Menu</Typography>
            </Grid>

        </Grid>
      <Divider />
      <List>
        {
          users.jabatan === 'Human Resource'?
            MenuHumanResource.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton onClick={() => navigate(item.link)}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
              ))
                : users.jabatan === 'Chief Executive Officer'? 
                  MenuChiefExecutiveOfficer.map((item) => (
                    <ListItem key={item.name} disablePadding>
                      <ListItemButton onClick={() => navigate(item.link)}>
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                  )) 
                    : 
                    MenuSeniorProgrammer.map((item) => (
                      <ListItem key={item.name} disablePadding>
                        <ListItemButton onClick={() => navigate(item.link)}>
                        <ListItemIcon>
                          <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </ListItem>
                    ))
        }
      </List>
    </div>
  );

}

  export default MenuItem 