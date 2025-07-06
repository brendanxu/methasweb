const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedLocationsData() {
  console.log('🌍 Seeding additional office locations data...\n');

  try {
    // Clear existing locations but keep the headquarters
    console.log('🧹 Clearing non-headquarters office locations...');
    await prisma.officeLocation.deleteMany({
      where: { isHeadquarters: false }
    });

    // Additional office locations for global presence
    console.log('🏢 Creating office locations...');
    
    const locationsData = [
      // Europe
      {
        name: 'Berlin Office',
        address: 'Potsdamer Platz 10, 10785 Berlin',
        city: 'Berlin',
        country: 'Germany',
        countryCode: 'DE',
        phone: '+49 30 2000 5678',
        email: 'berlin@southpole.com',
        timezone: 'CET',
        coordinates: '52.5200,13.4050',
        description: 'Our German operations center, focusing on the European carbon markets and renewable energy projects.',
        imageUrl: 'https://images.unsplash.com/photo-1587330979470-3346b2efb4c1?w=800&h=600&fit=crop',
        isHeadquarters: false
      },
      {
        name: 'Amsterdam Office',
        address: 'Herengracht 182, 1016 BR Amsterdam',
        city: 'Amsterdam',
        country: 'Netherlands',
        countryCode: 'NL',
        phone: '+31 20 123 4567',
        email: 'amsterdam@southpole.com',
        timezone: 'CET',
        coordinates: '52.3676,4.9041',
        description: 'Supporting climate action initiatives across the Netherlands and Benelux region.',
        imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop',
        isHeadquarters: false
      },

      // North America
      {
        name: 'Toronto Office',
        address: '100 King Street West, Toronto, ON M5X 1C9',
        city: 'Toronto',
        country: 'Canada',
        countryCode: 'CA',
        phone: '+1 416 555 0123',
        email: 'toronto@southpole.com',
        timezone: 'EST',
        coordinates: '43.6532,-79.3832',
        description: 'Canadian headquarters serving North American clients and managing forestry projects.',
        imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop',
        isHeadquarters: false
      },
      {
        name: 'San Francisco Office',
        address: '1 Market Street, San Francisco, CA 94105',
        city: 'San Francisco',
        country: 'United States',
        countryCode: 'US',
        phone: '+1 415 555 0189',
        email: 'sanfrancisco@southpole.com',
        timezone: 'PST',
        coordinates: '37.7749,-122.4194',
        description: 'West Coast operations focusing on tech sector partnerships and innovation.',
        imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
        isHeadquarters: false
      },

      // Asia Pacific
      {
        name: 'Tokyo Office',
        address: '1-1-1 Marunouchi, Chiyoda City, Tokyo 100-0005',
        city: 'Tokyo',
        country: 'Japan',
        countryCode: 'JP',
        phone: '+81 3 1234 5678',
        email: 'tokyo@southpole.com',
        timezone: 'JST',
        coordinates: '35.6762,139.6503',
        description: 'Leading climate solutions in Japan and coordinating Asia-Pacific renewable energy projects.',
        imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
        isHeadquarters: false
      },
      {
        name: 'Sydney Office',
        address: 'Level 20, 1 Martin Place, Sydney NSW 2000',
        city: 'Sydney',
        country: 'Australia',
        countryCode: 'AU',
        phone: '+61 2 9876 5432',
        email: 'sydney@southpole.com',
        timezone: 'AEST',
        coordinates: '-33.8688,151.2093',
        description: 'Australia and New Zealand operations, specializing in land use and forestry projects.',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        isHeadquarters: false
      },
      {
        name: 'Mumbai Office',
        address: 'Bandra Kurla Complex, Mumbai, Maharashtra 400051',
        city: 'Mumbai',
        country: 'India',
        countryCode: 'IN',
        phone: '+91 22 1234 5678',
        email: 'mumbai@southpole.com',
        timezone: 'IST',
        coordinates: '19.0760,72.8777',
        description: 'South Asia hub for renewable energy and sustainable development projects.',
        imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop',
        isHeadquarters: false
      },

      // Latin America
      {
        name: 'Mexico City Office',
        address: 'Paseo de la Reforma 296, Mexico City 06600',
        city: 'Mexico City',
        country: 'Mexico',
        countryCode: 'MX',
        phone: '+52 55 1234 5678',
        email: 'mexico@southpole.com',
        timezone: 'CST',
        coordinates: '19.4326,-99.1332',
        description: 'Central American operations focusing on forest conservation and renewable energy.',
        imageUrl: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=800&h=600&fit=crop',
        isHeadquarters: false
      },
      {
        name: 'Bogotá Office',
        address: 'Carrera 7 #71-21, Bogotá 110231',
        city: 'Bogotá',
        country: 'Colombia',
        countryCode: 'CO',
        phone: '+57 1 234 5678',
        email: 'bogota@southpole.com',
        timezone: 'COT',
        coordinates: '4.7110,-74.0721',
        description: 'Supporting sustainable development and conservation projects across Colombia.',
        imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?w=800&h=600&fit=crop',
        isHeadquarters: false
      },

      // Africa
      {
        name: 'Nairobi Office',
        address: 'Westlands Road, Nairobi 00100',
        city: 'Nairobi',
        country: 'Kenya',
        countryCode: 'KE',
        phone: '+254 20 123 4567',
        email: 'nairobi@southpole.com',
        timezone: 'EAT',
        coordinates: '-1.2921,36.8219',
        description: 'East Africa hub for conservation, reforestation, and community development projects.',
        imageUrl: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&h=600&fit=crop',
        isHeadquarters: false
      },
      {
        name: 'Cape Town Office',
        address: 'V&A Waterfront, Cape Town 8001',
        city: 'Cape Town',
        country: 'South Africa',
        countryCode: 'ZA',
        phone: '+27 21 123 4567',
        email: 'capetown@southpole.com',
        timezone: 'SAST',
        coordinates: '-33.9249,18.4241',
        description: 'Southern Africa operations center focusing on renewable energy and community projects.',
        imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop',
        isHeadquarters: false
      },

      // Additional Strategic Locations
      {
        name: 'Jakarta Office',
        address: 'Jl. Sudirman Kav. 52-53, Jakarta 12190',
        city: 'Jakarta',
        country: 'Indonesia',
        countryCode: 'ID',
        phone: '+62 21 1234 5678',
        email: 'jakarta@southpole.com',
        timezone: 'WIB',
        coordinates: '-6.2088,106.8456',
        description: 'Southeast Asia operations focusing on palm oil sustainability and forest protection.',
        imageUrl: 'https://images.unsplash.com/photo-1555899434-94d1b4730073?w=800&h=600&fit=crop',
        isHeadquarters: false
      },
      {
        name: 'Dubai Office',
        address: 'Dubai International Financial Centre, Dubai',
        city: 'Dubai',
        country: 'United Arab Emirates',
        countryCode: 'AE',
        phone: '+971 4 123 4567',
        email: 'dubai@southpole.com',
        timezone: 'GST',
        coordinates: '25.2048,55.2708',
        description: 'Middle East hub for renewable energy projects and carbon market development.',
        imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
        isHeadquarters: false
      }
    ];

    for (const location of locationsData) {
      await prisma.officeLocation.create({ data: location });
    }

    console.log(`✅ Created ${locationsData.length} additional office locations`);

    console.log('\n🎉 Office locations data seeding completed successfully!');
    
    // Summary
    const summary = {
      totalLocations: await prisma.officeLocation.count({ where: { isActive: true } }),
      headquarters: await prisma.officeLocation.count({ where: { isHeadquarters: true } }),
      countries: await prisma.officeLocation.findMany({
        where: { isActive: true },
        select: { country: true },
        distinct: ['country']
      })
    };

    console.log('\n📋 Office Locations Summary:');
    console.log(`   - Total locations: ${summary.totalLocations}`);
    console.log(`   - Headquarters: ${summary.headquarters}`);
    console.log(`   - Countries: ${summary.countries.length}`);
    
    // Group by regions
    const regionMapping = {
      'Switzerland': 'Europe',
      'United Kingdom': 'Europe',
      'Germany': 'Europe',
      'Netherlands': 'Europe',
      'United States': 'North America',
      'Canada': 'North America',
      'Singapore': 'Asia Pacific',
      'Australia': 'Asia Pacific',
      'Japan': 'Asia Pacific',
      'India': 'Asia Pacific',
      'Indonesia': 'Asia Pacific',
      'Brazil': 'Latin America',
      'Mexico': 'Latin America',
      'Colombia': 'Latin America',
      'Kenya': 'Africa',
      'South Africa': 'Africa',
      'United Arab Emirates': 'Middle East'
    };

    const regionCounts = summary.countries.reduce((acc, countryData) => {
      const region = regionMapping[countryData.country] || 'Other';
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📍 Regional Distribution:');
    Object.entries(regionCounts).forEach(([region, count]) => {
      console.log(`   - ${region}: ${count} countries`);
    });

  } catch (error) {
    console.error('❌ Office locations seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedLocationsData().catch(console.error);
}

module.exports = { seedLocationsData };