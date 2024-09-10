import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

type PropTypes = {
  title: string;
  value: number;
};

const StatsCard = ({ title, value }: PropTypes) => {
  return (
    <Card className='border'>
      <CardHeader className='flex-row justify-between items-center'>
        <CardTitle>{title}</CardTitle>
        <CardDescription className='text-5xl font-extrabold text-primary mt-[0px!important]'>
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default StatsCard;
