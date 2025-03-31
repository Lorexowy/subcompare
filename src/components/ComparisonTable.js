'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ComparisonTable({ subscriptions, selectedPaymentType = 'monthly' }) {
  const [paymentType, setPaymentType] = useState(selectedPaymentType)
  
  // Funkcja formatująca cenę
  const formatPrice = (price) => {
    return price.toFixed(2) + ' zł'
  }
  
  // Funkcja określająca cenę w zależności od typu płatności
  const getPrice = (subscription) => {
    if (paymentType === 'yearly') {
      return subscription.priceYearly ? (subscription.priceYearly / 12).toFixed(2) + ' zł/mies.*' : 'N/D'
    } else {
      return formatPrice(subscription.priceMonthly)
    }
  }
  
  // Funkcja renderująca ikony Tak/Nie
  const renderBoolean = (value) => {
    if (value === true) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500 mx-auto">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
      )
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 mx-auto">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
        </svg>
      )
    }
  }
  
  // Sprawdź czy mamy jakieś subskrypcje do porównania
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-light-300">Brak subskrypcji do porównania.</p>
        <Link href="/compare" className="btn-primary mt-4 inline-block">
          Wybierz subskrypcje do porównania
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      {/* Przełącznik typu płatności */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex bg-dark-200 rounded-lg p-1">
          <button
            className={`px-4 py-2 text-sm rounded-md ${
              paymentType === 'monthly' ? 'bg-primary text-white' : 'text-light-300'
            }`}
            onClick={() => setPaymentType('monthly')}
          >
            Miesięcznie
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-md ${
              paymentType === 'yearly' ? 'bg-primary text-white' : 'text-light-300'
            }`}
            onClick={() => setPaymentType('yearly')}
          >
            Rocznie
          </button>
        </div>
      </div>
      
      {/* Tabela porównawcza */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-dark-100">
            <th className="p-4 text-left border-b border-dark-200 min-w-[200px]">Subskrypcja</th>
            <th className="p-4 text-center border-b border-dark-200">Cena</th>
            <th className="p-4 text-center border-b border-dark-200">Liczba ekranów</th>
            <th className="p-4 text-center border-b border-dark-200">Jakość</th>
            <th className="p-4 text-center border-b border-dark-200">Offline</th>
            <th className="p-4 text-center border-b border-dark-200">Bez reklam</th>
            <th className="p-4 text-center border-b border-dark-200">Okres próbny</th>
            <th className="p-4 text-center border-b border-dark-200">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription, index) => (
            <tr 
              key={subscription.id} 
              className={index % 2 === 0 ? 'bg-dark-300' : 'bg-dark-200'}
            >
              {/* Nazwa subskrypcji */}
              <td className="p-4 border-b border-dark-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center mr-3 p-1">
                    {/* Placeholder dla logo */}
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                      <span className="text-dark-300 font-bold text-xs">{subscription.provider[0]}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{subscription.name}</div>
                    <div className="text-sm text-light-300">{subscription.provider}</div>
                  </div>
                </div>
              </td>
              
              {/* Cena */}
              <td className="p-4 text-center border-b border-dark-200">
                {getPrice(subscription)}
                {paymentType === 'yearly' && subscription.yearlyDiscount > 0 && (
                  <div className="text-xs text-green-400 mt-1">
                    {subscription.yearlyDiscount}% taniej
                  </div>
                )}
              </td>
              
              {/* Liczba ekranów */}
              <td className="p-4 text-center border-b border-dark-200">
                {subscription.screens}
              </td>
              
              {/* Jakość */}
              <td className="p-4 text-center border-b border-dark-200">
                {subscription.resolution}
              </td>
              
              {/* Offline */}
              <td className="p-4 text-center border-b border-dark-200">
                {renderBoolean(subscription.offlineViewing)}
              </td>
              
              {/* Bez reklam */}
              <td className="p-4 text-center border-b border-dark-200">
                {renderBoolean(subscription.adsFree)}
              </td>
              
              {/* Okres próbny */}
              <td className="p-4 text-center border-b border-dark-200">
                {subscription.trialPeriod > 0 ? `${subscription.trialPeriod} dni` : 'Brak'}
              </td>
              
              {/* Akcje */}
              <td className="p-4 text-center border-b border-dark-200">
                <Link
                  href={subscription.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white py-1 px-3 rounded text-sm inline-block hover:bg-primary-dark transition-colors"
                >
                  Odwiedź
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Informacja o cenie rocznej */}
      {paymentType === 'yearly' && (
        <div className="mt-3 text-sm text-light-300">
          * Cena miesięczna przy płatności rocznej z góry
        </div>
      )}
    </div>
  )
}