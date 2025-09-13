import { baseApi } from '../../api/baseApi';

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listCustomers: builder.query({
      query: ({ page=1, limit=10, q='' }={}) => `/customers?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`,
      providesTags: ['Customer']
    }),
    getCustomer: builder.query({
      query: (id) => `/customers/${id}`,
      providesTags: (r, e, id) => [{ type:'Customer', id }]
    }),
    createCustomer: builder.mutation({
      query: (body) => ({ url: '/customers', method: 'POST', body }),
      invalidatesTags: ['Customer']
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/customers/${id}`, method: 'PUT', body }),
      invalidatesTags: (r,e,{id}) => [{ type:'Customer', id }, 'Customer']
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({ url: `/customers/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Customer']
    }),

    listLeads: builder.query({
      query: ({ customerId, status }) => `/customers/${customerId}/leads${status?`?status=${status}`:''}`,
      providesTags: (r,e,{customerId}) => [{ type:'Leads', id: customerId }]
    }),
    createLead: builder.mutation({
      query: ({ customerId, ...body }) => ({ url: `/customers/${customerId}/leads`, method: 'POST', body }),
      invalidatesTags: (r,e,{customerId}) => [{ type:'Leads', id: customerId }, { type:'Customer', id: customerId }]
    }),
    updateLead: builder.mutation({
      query: ({ customerId, leadId, ...body }) => ({ url: `/customers/${customerId}/leads/${leadId}`, method: 'PUT', body }),
      invalidatesTags: (r,e,{customerId}) => [{ type:'Leads', id: customerId }, { type:'Customer', id: customerId }]
    }),
    deleteLead: builder.mutation({
      query: ({ customerId, leadId }) => ({ url: `/customers/${customerId}/leads/${leadId}`, method: 'DELETE' }),
      invalidatesTags: (r,e,{customerId}) => [{ type:'Leads', id: customerId }, { type:'Customer', id: customerId }]
    })
  }),
  tagTypes: ['Customer','Leads']
});

export const { useListCustomersQuery, useGetCustomerQuery, useCreateCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation, useListLeadsQuery, useCreateLeadMutation, useUpdateLeadMutation, useDeleteLeadMutation } = customerApi;
