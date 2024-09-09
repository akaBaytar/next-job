const JobInfo = ({ text, icon }: { text: string; icon: React.ReactNode }) => {
  return (
    <div className='flex gap-1 items-center text-sm'>
      {icon}
      {text}
    </div>
  );
};

export default JobInfo;
