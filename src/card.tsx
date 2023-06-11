import type { FC } from 'react';

export type CardProps = {
  title: string;
  date: string;
  domain: string;
  icon: string;
};

export const Card: FC<CardProps> = ({ title, date, domain, icon }) => (
  <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
      fontFamily: 'NotoSansJP',
      backgroundColor: '#2E3440',
      color: '#E5E9F0',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '48px',
        width: '100%',
        height: '100%',
        borderStyle: 'solid',
        borderColor: '#FFFFFF',
        borderWidth: '4px',
        borderRadius: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: '1 1 0%',
          maxWidth: '100%',
          alignItems: 'center',
          maxHeight: '100%',
        }}
      >
        <h1
          style={{
            fontSize: '60px',
            lineHeight: 1,
            maxWidth: '100%',
          }}
        >
          <p
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
          >
            {title}
          </p>
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={`/${icon}`}
            alt="icon"
            width={100}
            height={100}
            style={{ borderRadius: '9999px', marginRight: '20px' }}
          />
          <h2
            style={{
              fontSize: '36px',
              lineHeight: '40px',
              marginRight: '20px',
            }}
          >
            <p
              style={{
                fontFamily: 'JetBrainsMono',
              }}
            >
              {domain}
            </p>
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
          }}
        >
          <h2
            style={{
              fontSize: '36px',
              lineHeight: '40px',
            }}
          >
            <p>{date}</p>
          </h2>
        </div>
      </div>
    </div>
  </div>
);
