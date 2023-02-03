import * as React from 'react';
import { format, isAfter, isBefore, subMinutes } from 'date-fns';
import styles from './index.module.css';
import signal from '../../assets/signal_cellular_alt.svg';
import link from '../../assets/link.svg';
import star from '../../assets/star.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { appContext } from '../../AppContext';
import linkRed from '../../assets/link_red.svg';
import signalRed from '../../assets/signal_cellular_red.svg';
import signalOrange from '../../assets/signal_cellular_orange.svg';
import linkOrange from '../../assets/link_orange.svg';

type ContactItemsProps = {
  id: number;
  favourite?: boolean;
  name: string;
  sameChain: boolean;
  lastSeen: number;
};

const ContactItem: React.FC<ContactItemsProps> = ({ id, name, sameChain, lastSeen, favourite }) => {
  const { _nicknames } = useContext(appContext);
  const hasNickname = _nicknames[id];
  const displayGreenNetwork = lastSeen ? isBefore(subMinutes(new Date(), 30), new Date(lastSeen)) : null;
  const displayYellowNetwork = lastSeen ? isAfter(subMinutes(new Date(), 30), new Date(lastSeen)) && isBefore(subMinutes(new Date(), 59), new Date(lastSeen)) : null;
  const displayRedNetwork = lastSeen ? isAfter(subMinutes(new Date(), 60), new Date(lastSeen)) : null;

  const displayGreenChain = sameChain && !!((displayGreenNetwork || displayYellowNetwork) && sameChain);
  const displayYellowChain = sameChain && !!(displayRedNetwork && sameChain);
  const displayRedChain = !sameChain;

  return (
    <div className={`${styles.card} py-4 px-3`}>
      <Link to={`/contacts/${id}`}>
        <div className="cursor-pointer px-3">
          <div className="flex items-stretch items-center h-full">
            <div className="relative mr-5">
              <div className="avatar">{!hasNickname ? name[0] : hasNickname[0]}</div>
              {favourite && (
                <div className="absolute bottom-0 right-0">
                  <div className="flex justify-center rounded rounded-xl bg-custom-yellow p-1 px-0.5 rounded rounded-xl">
                    <img alt="Star" src={star} className="-mt-0.5" />
                  </div>
                </div>
              )}
            </div>
            <div className="grow flex items-center">
              <div>
                <div className="font-bold mb-1">
                  {hasNickname && (
                    <span>
                      {hasNickname} <span className="text-custom-grey-2">({name})</span>
                    </span>
                  )}
                  {!hasNickname && name}
                </div>
                <div className="text-xs text-custom-grey">Last seen {format(new Date(lastSeen), 'p dd/MM/yyyy')}</div>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="pt-2 pr-0 flex gap-2">
                {displayGreenNetwork === true && <img alt="Good network" src={signal} />}
                {displayYellowNetwork === true && <img alt="Okay network" src={signalOrange} />}
                {displayRedNetwork === true && <img alt="Bad network" src={signalRed} />}
                {displayGreenChain === true && <img alt="Same chain" src={link} />}
                {displayYellowChain === true && <img alt="Same chain, not seen for a while" src={linkOrange} />}
                {displayRedChain === true && <img alt="Different chain" src={linkRed} />}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContactItem;
