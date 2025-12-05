import Head from 'next/head';
import Layout from '@/components/Layout/Layout.component';
import ProductList from '@/components/Product/ProductList.component';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.component';
import client from '@/utils/apollo/ApolloClient';
import { FETCH_ALL_PRODUCTS_QUERY } from '@/utils/gql/GQL_QUERIES';
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

const Catalog: NextPage = ({
  products,
  loading,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Catalog Component] Props:', {
      productsCount: products?.length || 0,
      loading,
      error,
      sampleProduct: products?.[0],
    });
  }

  if (loading)
    return (
      <Layout title="Products">
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      </Layout>
    );

  if (error) {
    return (
      <Layout title="Products">
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
          <p className="text-red-500 text-lg font-semibold">Error loading products</p>
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-500">Check the console for more details</p>
        </div>
      </Layout>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Layout title="Products">
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
          <p className="text-red-500 text-lg font-semibold">No products found</p>
          <p className="text-gray-600">No products are available in the catalog.</p>
          <p className="text-sm text-gray-500">
            Check: 1) Products exist in WooCommerce 2) Products are published 3) GraphQL endpoint is accessible
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Products">
      <Head>
        <title>Catalog | WooCommerce Next.js</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <ProductList products={products} title="Products" />
      </div>
    </Layout>
  );
};

export default Catalog;

export const getStaticProps: GetStaticProps = async () => {
  try {
    console.log('[Catalog] Fetching products...');
    console.log('[Catalog] GraphQL URL:', process.env.NEXT_PUBLIC_GRAPHQL_URL);
    
    const { data, loading, networkStatus, error } = await client.query({
      query: FETCH_ALL_PRODUCTS_QUERY,
      errorPolicy: 'all', // Return partial data even if there are errors
    });

    console.log('[Catalog] Query response:', {
      hasData: !!data,
      productsCount: data?.products?.nodes?.length || 0,
      loading,
      networkStatus,
      error: error ? error.message : null,
    });

    if (data?.products?.nodes) {
      console.log('[Catalog] Sample product:', data.products.nodes[0]);
    }

    const products = data?.products?.nodes || [];

    if (products.length === 0) {
      console.warn('[Catalog] No products returned from GraphQL query');
      console.warn('[Catalog] Full response:', JSON.stringify(data, null, 2));
    }

    return {
      props: {
        products,
        loading,
        networkStatus,
        error: error ? error.message : null,
      },
      revalidate: 60,
    };
  } catch (error: any) {
    // Handle GraphQL errors gracefully
    console.error('[Catalog] GraphQL Error:', error);
    console.error('[Catalog] Error details:', {
      message: error?.message,
      graphQLErrors: error?.graphQLErrors,
      networkError: error?.networkError,
    });
    
    return {
      props: {
        products: [],
        loading: false,
        networkStatus: 8, // Error status
        error: error?.message || 'Failed to fetch products',
      },
      revalidate: 60,
    };
  }
};

