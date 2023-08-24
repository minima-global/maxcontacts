import useAndroidShowTitleBar from '../../hooks/useAndroidShowTitleBar';

const TitleBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const openTitleBar = useAndroidShowTitleBar();

  return (
    <div className="title-bar min-h-[54px] flex w-full" onClick={openTitleBar}>
      <div className="title-bar__icon">
        <svg width="24" height="10" viewBox="0 0 24 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M4.79957 9.79958C2.14781 9.79958 0 7.65177 0 5.00001C0 2.34825 2.14781 0.200439 4.79957 0.200439C5.36352 0.200439 5.89147 0.320428 6.39542 0.488413C5.39951 1.7243 4.79957 3.29616 4.79957 5.00001C4.79957 6.70386 5.39951 8.27571 6.39542 9.5116C5.89147 9.67959 5.36352 9.79958 4.79957 9.79958ZM19.2004 9.79958C21.8522 9.79958 24 7.65177 24 5.00001C24 2.34825 21.8522 0.200439 19.2004 0.200439C18.6365 0.200439 18.1085 0.320428 17.6046 0.488413C18.6005 1.7243 19.2004 3.29616 19.2004 5.00001C19.2004 6.70386 18.6005 8.27571 17.6046 9.5116C18.1085 9.67959 18.6365 9.79958 19.2004 9.79958ZM16.7984 5.00001C16.7984 7.65074 14.6496 9.79958 11.9988 9.79958C9.3481 9.79958 7.19926 7.65074 7.19926 5.00001C7.19926 2.34928 9.3481 0.200439 11.9988 0.200439C14.6496 0.200439 16.7984 2.34928 16.7984 5.00001Z" fill="white"/>
        </svg>
      </div>
      <div className="title-bar__title">MaxContacts</div>
      <div className="flex flex-grow justify-end -mr-2">
        {children}
      </div>
    </div>
  );
};

export default TitleBar;
