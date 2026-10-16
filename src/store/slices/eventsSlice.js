import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchEvents, getEventById, getClassifications } from '../../services/ticketmaster'

const PAGE_SIZE = 20
const MAX_PAGE = 49

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async ({ filters, page }) => {
    const data = await searchEvents({
      keyword: filters.keyword,
      segmentId: filters.segmentId,
      city: filters.city,
      countryCode: filters.countryCode,
      startDateTime: filters.startDateTime,
      endDateTime: filters.endDateTime,
      sort: 'date,asc',
      size: PAGE_SIZE,
      page,
    })

    return {
      events: data._embedded ? data._embedded.events : [],
      totalPages: data.page ? Math.min(data.page.totalPages, MAX_PAGE + 1) : 0,
      totalElements: data.page ? data.page.totalElements : 0,
      page,
    }
  }
)

export const fetchEventById = createAsyncThunk('events/fetchEventById', async (id) => {
  return await getEventById(id)
})

export const fetchCategories = createAsyncThunk('events/fetchCategories', async () => {
  const data = await getClassifications()
  return data._embedded ? data._embedded.classifications : []
})

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  page: 0,
  totalPages: 0,
  totalElements: 0,
  filters: {
    keyword: '',
    segmentId: '',
    city: '',
    countryCode: '',
    startDateTime: '',
    endDateTime: '',
  },
  currentEvent: null,
  currentEventStatus: 'idle',
  currentEventError: null,
  categories: [],
  categoriesStatus: 'idle',
  categoriesError: null,
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters(state) {
      state.filters = initialState.filters
    },
    clearCurrentEvent(state) {
      state.currentEvent = null
      state.currentEventStatus = 'idle'
      state.currentEventError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.events
        state.totalPages = action.payload.totalPages
        state.totalElements = action.payload.totalElements
        state.page = action.payload.page
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        state.items = []
      })

      .addCase(fetchEventById.pending, (state) => {
        state.currentEventStatus = 'loading'
        state.currentEventError = null
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.currentEventStatus = 'succeeded'
        state.currentEvent = action.payload
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.currentEventStatus = 'failed'
        state.currentEventError = action.error.message
      })

      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading'
        state.categoriesError = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded'
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = 'failed'
        state.categoriesError = action.error.message
      })
  },
})

export const { setFilters, resetFilters, clearCurrentEvent } = eventsSlice.actions
export default eventsSlice.reducer
