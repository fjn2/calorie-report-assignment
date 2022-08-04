import { notification } from 'antd'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { avgNumberOfCaloriesPerUserSvc, foodEntryWeekComparisonSvc } from '../service/reporting.service'

const useReporting = () => {
  const [loading, setLoading] = useState()
  const [avgNumberOfCaloriesPerUserReport, setAvgNumberOfCaloriesPerUserReport] = useState()
  const [foodEntryWeekComparisonReport, setFoodEntryWeekComparisonReport] = useState()
  
  const [filters, setFilters] = useState({})

  useEffect(() => {
    setLoading(true)
    const promise1 = foodEntryWeekComparisonSvc(filters)
    .then(resp => {
      setFoodEntryWeekComparisonReport(resp)
    }).catch(e => {
      notification.error({
        description: e.message
      })
    })

    const promise2 = avgNumberOfCaloriesPerUserSvc(filters)
    .then(resp => {
      setAvgNumberOfCaloriesPerUserReport(resp)
    }).catch(e => {
      notification.error({
        description: e.message
      })
    })

    Promise.all([promise1, promise2]).then(() => {
      setLoading(false)
    })
  }, [filters])

  const formattedFoodEntryWeekComparisonReport =  (new Array(7).fill(1)).map((_, index) => {
    
    const foodEntryWeekComparisonItem = (foodEntryWeekComparisonReport || []).find(fewcr => fewcr.dayOfWeek === index)
    return {
      dayOfWeek: moment.weekdays(index),
      lastWeekCount: foodEntryWeekComparisonItem ? foodEntryWeekComparisonItem.lastweekcount : 0,
      thisWeekCount: foodEntryWeekComparisonItem ? foodEntryWeekComparisonItem.thisweekcount : 0,
      relation: foodEntryWeekComparisonItem ? `% ${(-100 + ((foodEntryWeekComparisonItem.thisweekcount * 100) / foodEntryWeekComparisonItem.lastweekcount)).toFixed(2)}` : 0,
    }
  })

  return {
    loading,
    avgNumberOfCaloriesPerUserReport,
    foodEntryWeekComparisonReport: formattedFoodEntryWeekComparisonReport,
    filters,
    setFilters,
  }
}

export default useReporting
