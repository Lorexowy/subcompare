import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const FeaturesTable = ({ subscriptions }) => {
  // Funkcja renderująca ikonę Tak/Nie
  const renderBoolean = (value) => {
    if (value === true) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };
  
  // Funkcje pomocnicze do wyświetlania odpowiednich danych
  const getResolution = (subscription) => subscription.resolution || 'N/A';
  const getScreens = (subscription) => subscription.screens || 'N/A';
  const getOfflineViewing = (subscription) => subscription.offlineViewing;
  const getAdsFree = (subscription) => subscription.adsFree;
  const getTrialPeriod = (subscription) => 
    subscription.trialPeriod > 0 ? `${subscription.trialPeriod} dni` : 'Brak';

  // Struktura danych określająca wiersze tabeli
  const features = [
    { 
      name: 'Jakość wideo', 
      getValue: getResolution,
      renderValue: (value) => <span>{value}</span>
    },
    { 
      name: 'Liczba ekranów', 
      getValue: getScreens,
      renderValue: (value) => <span>{value}</span>
    },
    { 
      name: 'Pobieranie offline', 
      getValue: getOfflineViewing,
      renderValue: (value) => renderBoolean(value)
    },
    { 
      name: 'Bez reklam', 
      getValue: getAdsFree,
      renderValue: (value) => renderBoolean(value)
    },
    { 
      name: 'Okres próbny', 
      getValue: getTrialPeriod,
      renderValue: (value) => <span>{value}</span>
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-dark-100">
          <tr>
            <th className="p-4 text-left font-medium">Funkcja</th>
            {subscriptions.map(subscription => (
              <th key={subscription.id} className="p-4 text-center font-medium">
                {subscription.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-b border-dark-100">
              <td className="p-4 font-medium">{feature.name}</td>
              {subscriptions.map(subscription => (
                <td key={subscription.id} className="p-4 text-center">
                  <div className="flex justify-center">
                    {feature.renderValue(feature.getValue(subscription))}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturesTable;