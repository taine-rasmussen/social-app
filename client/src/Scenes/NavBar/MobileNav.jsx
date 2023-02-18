

const MobileNav = () => {
  return (
    <Box
      sx={{
        backgroundColor: background,
        maxWidth: '175px',
        minWidth: '75px',
        padding: '0.75rem 0',
        borderRadius: '0.5rem',
        zIndex: '999999'
      }}
    >
      <Box
        display='flex'
        justifyContent='flex-end'
      >
        <IconButton
          onClick={() => { setIsMobileMenuToggled(!isMobileMenuToggled) }}
        >
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <FlexBetween
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        gap='0.5rem'
        padding='0.5rem'
      >

        {theme.palette.mode === 'dark' ? (
          <DarkMode sx={{ fontSize: '25px' }} onClick={() => dispatch(setMode())} />
        ) : (
          <LightMode sx={{ color: dark, fontSize: '25px' }} onClick={() => dispatch(setMode())} />
        )}
        <Message sx={{ fontSize: '25px' }} />
        <Notifications sx={{ fontSize: '25px' }} />
        <Help sx={{ fontSize: '25px' }} />
        <LogoutIcon
          sx={{ fontSize: '25px' }}
          onClick={() => {
            dispatch(setLogout())
            navigate('/')
          }}
        />
      </FlexBetween>
    </Box>
  )
}

export default MobileNav
