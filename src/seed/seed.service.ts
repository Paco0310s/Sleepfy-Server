import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Test } from '../tests/entities/test.entity';
import { Question } from '../questions/entities/question.entity';
import { AnswersOption } from '../answers_options/entities/answers_option.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  async onModuleInit() {
    try {
      await this.runSeed();
    } catch (error) {
      this.logger.warn(`Auto-seed omitido o pendiente de base de datos: ${error}`);
    }
  }

  async runSeed() {
    // 0. Verificar si ya existe "Nuevo Test" con preguntas para evitar duplicados
    const existingTest = await Test.findOne({
      where: { name: 'Nuevo Test' },
      include: [Question],
      order: [['id', 'DESC']],
    });

    if (existingTest && existingTest.questions && existingTest.questions.length > 0) {
      return {
        message: 'El "Nuevo Test" ya se encuentra registrado en la base de datos',
        testId: existingTest.id,
        testName: existingTest.name,
        totalQuestions: existingTest.questions.length,
      };
    }

    // 1. Crear el nuevo Test
    const test = await Test.create({
      name: 'Nuevo Test',
    });

    // 2. Definición de preguntas y respuestas basadas en medicina del sueño
    const questionsData = [
      {
        question: '¿Cuánto tiempo tardas habitualmente en conciliar el sueño una vez que apagas la luz?',
        options: [
          'Menos de 15 minutos (Duermo casi de inmediato)',
          'Entre 15 y 30 minutos (Tiempo promedio saludable)',
          'Entre 30 y 60 minutos (Me cuesta trabajo conciliar)',
          'Más de 1 hora (Insomnio de conciliación frecuente)',
        ],
      },
      {
        question: '¿Con qué frecuencia te despiertas a mitad de la noche?',
        options: [
          'Rara vez o nunca (Duermo de corrido)',
          '1 vez por noche, pero me vuelvo a dormir rápido',
          '2 o más veces y me cuesta retomar el sueño',
          'Me despierto de madrugada y ya no puedo volver a dormir',
        ],
      },
      {
        question: '¿Qué tan constantes son tus horarios para dormir y despertar entre semana vs fines de semana?',
        options: [
          'Muy regulares (Varían menos de 30 minutos)',
          'Ligeramente variables (Varían entre 1 y 2 horas)',
          'Muy irregulares (Varían más de 2 horas según compromisos)',
        ],
      },
      {
        question: '¿A qué hora sueles consumir tu última bebida estimulante (café, té con cafeína o energizante)?',
        options: [
          'Antes de las 12:00 PM o no consumo estimulantes',
          'Entre las 12:00 PM y las 4:00 PM',
          'Entre las 4:00 PM y las 8:00 PM',
          'Cerca de la noche o antes de acostarme',
        ],
      },
      {
        question: '¿Usas celular, computadora o televisión en los últimos 45 minutos antes de dormir o acostado en la cama?',
        options: [
          'Casi nunca (Desconecto pantallas al menos 45 min antes)',
          'A veces, pero uso filtro de luz nocturna cálida',
          'Frecuentemente, suelo usar el celular en la cama hasta darme sueño',
        ],
      },
      {
        question: '¿Qué suele pasar por tu mente cuando intentas quedarte dormido en la almohada?',
        options: [
          'Tranquilidad, mi mente se apaga sin esfuerzo',
          'Repaso brevemente actividades o pendientes del día siguiente',
          'Pensamientos acelerados, preocupación o rumiación mental',
          'Inquietud o tensión física en el cuerpo',
        ],
      },
      {
        question: '¿Cómo describirías tu nivel de energía y descanso al despertar por la mañana?',
        options: [
          'Renovado y con energía para afrontar el día',
          'Algo pesado los primeros minutos, pero luego con buena energía',
          'Cansado, siento que mi sueño fue muy superficial',
          'Agotado y con niebla mental la mayor parte de la mañana',
        ],
      },
    ];

    const createdQuestions = [];

    for (const qItem of questionsData) {
      const q = await Question.create({
        question: qItem.question,
        testId: test.id,
      });

      for (const optText of qItem.options) {
        await AnswersOption.create({
          answer: optText,
          isCorrect: false,
          questionId: q.id,
        });
      }

      createdQuestions.push(q);
    }

    return {
      message: 'Seeder ejecutado exitosamente.',
      test: {
        id: test.id,
        name: test.name,
      },
      totalQuestions: createdQuestions.length,
    };
  }
}

