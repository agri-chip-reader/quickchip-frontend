import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

const TasksProgress = ({ title, fiabiality }) => (
  <Card
    sx={{ height: '100%' }}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            {title}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {fiabiality}%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "#951703",
              height: 56,
              width: 56
            }}
          >
            <AccessibilityIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={fiabiality}
          variant="determinate"
        />
      </Box>
    </CardContent>
  </Card>
);

export default TasksProgress;
