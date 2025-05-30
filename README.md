# Document Converter Frontend

A modern web application built with Next.js for converting documents between different formats. This frontend application provides a user-friendly interface for document conversion with features like drag-and-drop file upload and real-time conversion status updates.

## Features

- Modern, responsive UI built with Next.js and Tailwind CSS
- Drag-and-drop file upload interface
- Real-time conversion status updates
- Support for multiple document formats
- Docker support for both development and production environments

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **File Handling:** React Dropzone
- **Icons:** React Icons
- **Containerization:** Docker & Docker Compose

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- Docker and Docker Compose
- npm or yarn package manager

## Project Structure

```
document-converter-frontend/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   └── components/         # React components
│       ├── FileUpload.tsx  # File upload component
│       ├── LoadingSpinner.tsx
│       └── ConversionCard.tsx
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose configuration
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md             # Project documentation
```

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/mehedishovon01/documents-coverter-frontend.git
   cd document-converter-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

### Docker Development

1. Build and start the development container:
   ```bash
   docker compose up
   ```

This will start the application in development mode with hot reloading enabled.

### Production Deployment

1. Build and start the production container:
   ```bash
   docker compose up
   ```

The production build will be available at `http://localhost:3000`

## Docker Configuration

The project includes two Docker configurations:

### Development Environment
- Uses the `deps` stage from Dockerfile
- Includes hot reloading
- Mounts local files for development
- Accessible at `http://localhost:3000`

### Production Environment
- Uses multi-stage build for optimized production image
- Includes only necessary production files
- Runs as non-root user for security
- Accessible at `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Docker Commands

### Development Server
```bash
# Start development environment
docker compose up

# Rebuild development container
docker compose build
```

## Security Features

- Production Docker image runs as non-root user
- Environment variables for sensitive data
- Proper file permissions in Docker container
- Next.js telemetry disabled

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 